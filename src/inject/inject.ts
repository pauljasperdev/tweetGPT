import { addGPTButton } from "./dom/add_gpt_button";
import { createObserver } from "./dom/create_observer";
import { findClosestInput, inputSelector } from "./dom/find_closest_input";
import { generateTexts } from "./utils/generate_text";
import { setInputText } from "./dom/set_input_text";
import { defaultLocale } from "../shared/locales";
import { STORAGE_KEYS, StoredSettings } from "../shared/storage_keys";

const findReplyTweet = () => document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
const replyTextOf = (tweetEl: Element) => tweetEl.querySelector("div[data-testid=\"tweetText\"]")?.textContent || undefined;

// Drafts open by themselves once per tweet; after that the robot button asks for new ones.
let lastAutoDraftedTweet: string | undefined;

const onToolBarAdded = (toolBarEl: Element) => {
    if (!findClosestInput(toolBarEl)) {
        return;
    }

    const generate = async (topic?: string) => {
        const replyToTweet = findReplyTweet();
        let replyTo: string | undefined = undefined;
        if (replyToTweet) {
            replyTo = replyTextOf(replyToTweet);
            if (!replyTo) {
                return undefined;
            }
        }

        return generateTexts({
            locale: (await chrome.storage.local.get<StoredSettings>(STORAGE_KEYS.language))[STORAGE_KEYS.language] ?? defaultLocale,
            replyTo,
            topic
        });
    };

    const insert = (text: string) => {
        (toolBarEl as HTMLDivElement).click();
        const inputEl = findClosestInput(toolBarEl);
        if (inputEl) {
            setInputText(inputEl, text);
        }
    };

    const replyToTweet = findReplyTweet();
    const replyTo = replyToTweet ? replyTextOf(replyToTweet) : undefined;
    const openNow = Boolean(replyTo) && replyTo !== lastAutoDraftedTweet && !toolBarEl.querySelector(".gptIconWrapper");
    if (openNow) {
        lastAutoDraftedTweet = replyTo;
    }

    addGPTButton(toolBarEl, generate, insert, openNow);
}

// A collapsed reply box has no toolbar yet; focusing it makes X render one, which opens the drafts.
const onInputAdded = (inputEl: Element) => {
    if (findReplyTweet() && document.activeElement !== inputEl) {
        (inputEl as HTMLElement).focus({ preventScroll: true });
    }
}

const onToolBarRemoved = (toolBarEl: Element) => {}

// observe dom tree to detect all tweet inputs once they are created
const toolbarSelector = "div[data-testid=\"toolBar\"]";
const toolbarObserver = createObserver(toolbarSelector, onToolBarAdded, onToolBarRemoved);
const reactRoot = document.querySelector("#react-root");

if (reactRoot) {
    document.querySelectorAll(inputSelector).forEach(onInputAdded);
    document.querySelectorAll(toolbarSelector).forEach(onToolBarAdded);
    createObserver(inputSelector, onInputAdded, () => {}).observe(reactRoot, { subtree: true, childList: true });
    toolbarObserver.observe(reactRoot, { subtree: true, childList: true });
}
