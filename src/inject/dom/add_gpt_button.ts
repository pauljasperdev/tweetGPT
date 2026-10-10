import { wait } from "../../utils/wait";
import { STORAGE_KEYS, StoredSettings } from "../../shared/storage_keys";
import { findClosestInput } from "./find_closest_input";

const gptIconSrc = chrome.runtime.getURL("icons/button.svg");
const gptIconErrorSrc = chrome.runtime.getURL("icons/button_error.svg");

// Stand-in until new tweets get a real topic source.
const PLACEHOLDER_TOPIC = 'Twitter';
const DRAFT_COUNT = 5;

const maybeReturnTopic = async (): Promise<string | undefined> => {
    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    if (!replyToTweet) {
        return PLACEHOLDER_TOPIC;
    }

    const state = await chrome.storage.local.get<StoredSettings>([STORAGE_KEYS.isAddTopicForReplies, STORAGE_KEYS.lastTopic]);
    if (!state.isAddTopicForReplies) {
        return undefined;
    }

    const topic = window.prompt("What do you want to tweet about?", state.lastTopic ?? '') || PLACEHOLDER_TOPIC;
    await chrome.storage.local.set({ [STORAGE_KEYS.lastTopic]: topic });
    return topic;
}

export const addGPTButton = (
    toolbarEl: Element,
    generate: (topic?: string) => Promise<string[] | undefined>,
    onPick: (text: string) => void,
    openNow: boolean,
) => {
    if (toolbarEl.querySelector(".gptIconWrapper")) {
        return;
    }

    const buttonContainer = toolbarEl.children[0];
    if (!buttonContainer) {
        return;
    }

    const doc = new DOMParser().parseFromString(`
        <div class="gptIconWrapper" id="gptButton">
            <img class="gptIcon" src="${gptIconSrc}" />
        </div>
    `, "text/html");
    const iconWrap = doc.querySelector("div[id=\"gptButton\"]")! as HTMLDivElement;

    // attach to container
    buttonContainer.appendChild(iconWrap);

    const open = async () => {
        const topic = await maybeReturnTopic();
        const picker = openPicker(iconWrap, toolbarEl);

        iconWrap.classList.add("loading");
        const texts = await generate(topic);
        iconWrap.classList.remove("loading");

        if (texts?.length) {
            picker.show(texts, onPick);
        } else {
            picker.close();
            showErrorButton(toolbarEl);
        }
    }

    iconWrap.onclick = open;
    if (openNow) {
        void open();
    }
}

// Opens next to the button with placeholders, so something is on screen while the drafts are written.
const openPicker = (anchor: HTMLElement, toolbarEl: Element) => {
    const container = document.createElement("div");
    container.classList.add("gptSelectorContainer");
    container.onclick = (e) => e.stopPropagation();
    // keep focus in the composer while a draft is picked
    container.onmousedown = (e) => e.preventDefault();

    // follow the active X theme; X paints its background on <body> or on the root element
    const inputEl = findClosestInput(toolbarEl);
    const pageBackground = [document.body, document.documentElement]
        .map((el) => getComputedStyle(el).backgroundColor)
        .find((color) => color !== 'rgba(0, 0, 0, 0)');
    if (inputEl && pageBackground) {
        container.style.backgroundColor = pageBackground;
        container.style.color = getComputedStyle(inputEl).color;
    }

    // X navigates without reloading, which would leave the picker floating over the next page
    const openedAt = location.href;
    const navigationWatch = window.setInterval(() => {
        if (location.href !== openedAt) {
            close();
        }
    }, 500);

    const close = () => {
        window.clearInterval(navigationWatch);
        document.body.removeEventListener('click', close);
        container.remove();
    };

    const drafts = document.createElement("div");
    for (let i = 0; i < DRAFT_COUNT; i += 1) {
        const placeholder = document.createElement("div");
        placeholder.classList.add("gptPlaceholder");
        drafts.appendChild(placeholder);
    }
    container.appendChild(drafts);

    const settings = document.createElement("button");
    settings.classList.add("gptSelector", "gptSettings");
    settings.textContent = "Settings";
    settings.onclick = () => {
        const url = chrome.runtime.getURL("assets/settings.html");
        window.open(url, '_blank')?.focus();
    };
    container.appendChild(settings);

    const place = () => {
        const bodyRect = document.body.getBoundingClientRect();
        const anchorRect = anchor.getBoundingClientRect();
        container.style.left = `${anchorRect.left - bodyRect.left + 40}px`;
        container.style.top = `${anchorRect.top - bodyRect.top}px`;
    };

    place();
    document.body.appendChild(container);
    // deferred so the click that opened the picker does not dismiss it
    window.setTimeout(() => document.body.addEventListener('click', close), 1);

    const show = (texts: string[], onPick: (text: string) => void) => {
        // the page may have shifted while the drafts were written
        place();
        drafts.replaceChildren(...texts.map((text) => {
            const draft = document.createElement("button");
            draft.classList.add("gptSelector");
            draft.textContent = text;
            draft.onclick = () => {
                close();
                onPick(text);
            };
            return draft;
        }));
    };

    return { show, close };
}

export const showErrorButton = async (toolbarEl: Element) => {
    const gptIcon = toolbarEl.querySelector(".gptIcon");
    if (gptIcon) {
        gptIcon.setAttribute("src", gptIconErrorSrc);
        gptIcon.classList.add("error");
    }
    await wait(5000);
    gptIcon?.setAttribute("src", gptIconSrc);
    gptIcon?.classList.remove("error");
}
