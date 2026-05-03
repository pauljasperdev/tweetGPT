/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/wait.ts
const wait = (timeout) => {
    return new Promise((res) => setTimeout(() => res(null), timeout));
};

;// CONCATENATED MODULE: ./src/inject/dom/add_gpt_button.ts

const gptIconSrc = chrome.runtime.getURL("icons/button.svg");
const gptIconErrorSrc = chrome.runtime.getURL("icons/button_error.svg");
const tweetTypes = [
    { emoji: '👍', type: 'supportive' },
    { emoji: '🎩', type: 'snarky' },
    { emoji: '🌤️', type: 'optimistic' },
    { emoji: '🔥', type: 'controversial' },
    { emoji: '🤩', type: 'excited' },
    { emoji: '🧠', type: 'smart' },
    { emoji: '🤠', type: 'hillbilly' },
    { emoji: '🏴‍☠️', type: 'pirate' },
    { emoji: '🤣', type: 'humorous' },
    { emoji: '🙄', type: 'passive aggressive' }
];
const addGPTButton = async (toolbarEl, onClick) => {
    addGPTButtonWithType(toolbarEl, onClick);
};
const maybeReturnTopic = async () => {
    const replyState = await chrome.storage.local.get('isAddTopicForReplies');
    const isAddTopicForReplies = replyState.isAddTopicForReplies ?? false;
    const lastState = await chrome.storage.local.get('lastTopic');
    const lastTopic = lastState.lastTopic ?? '';
    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    let topic;
    if (!replyToTweet || isAddTopicForReplies) {
        topic = window.prompt("What do you want to tweet about?", lastTopic) || 'Twitter';
        await chrome.storage.local.set({ 'lastTopic': topic });
    }
    return topic;
};
const addGPTButtonWithType = (toolbarEl, onClick) => {
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
    const iconWrap = doc.querySelector("div[id=\"gptButton\"]");
    // attach to container
    buttonContainer.appendChild(iconWrap);
    iconWrap.onclick = async () => {
        const topic = await maybeReturnTopic();
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = iconWrap.getBoundingClientRect();
        const top = elemRect.top - bodyRect.top;
        const left = elemRect.left - bodyRect.left + 40;
        let optionsList;
        let dismissHandler;
        optionsList = createOptionsList(async (type) => {
            if (dismissHandler) {
                document.body.removeEventListener('click', dismissHandler);
            }
            if (optionsList) {
                optionsList.remove();
            }
            iconWrap.classList.add("loading");
            await onClick(type, topic);
            iconWrap.classList.remove("loading");
        });
        // adding settings button
        const separator = document.createElement("div");
        separator.classList.add("gptSeparator");
        optionsList.appendChild(separator);
        const item = document.createElement("div");
        item.classList.add("gptSelector");
        item.innerHTML = `⚙️&nbsp;&nbsp;Settings`;
        item.onclick = (e) => {
            e.stopPropagation();
            const url = chrome.runtime.getURL("assets/settings.html");
            window.open(url, '_blank')?.focus();
        };
        optionsList.appendChild(item);
        optionsList.style.left = `${left}px`;
        optionsList.style.top = `${top}px`;
        document.body.appendChild(optionsList);
        dismissHandler = () => {
            if (dismissHandler) {
                document.body.removeEventListener('click', dismissHandler);
            }
            if (optionsList) {
                optionsList.remove();
            }
        };
        window.setTimeout(() => {
            document.body.addEventListener('click', dismissHandler);
        }, 1);
    };
};
const createOptionsList = (onClick) => {
    const container = document.createElement("div");
    container.classList.add("gptSelectorContainer");
    for (const tt of tweetTypes) {
        const item = document.createElement("div");
        item.classList.add("gptSelector");
        item.innerHTML = `${tt.emoji}&nbsp;&nbsp;${tt.type}`;
        item.onclick = (e) => {
            e.stopPropagation();
            onClick(tt.type);
        };
        container.appendChild(item);
    }
    return container;
};
const showErrorButton = async (toolbarEl) => {
    const gptIcon = toolbarEl.querySelector(".gptIcon");
    if (gptIcon) {
        gptIcon.setAttribute("src", gptIconErrorSrc);
        gptIcon.classList.add("error");
    }
    await wait(5000);
    gptIcon?.setAttribute("src", gptIconSrc);
    gptIcon?.classList.remove("error");
};

;// CONCATENATED MODULE: ./src/inject/dom/create_observer.ts
const createObserver = (selector, onInputAdded, onInputRemoved) => {
    const getMatches = (node) => {
        if (!(node instanceof Element)) {
            return [];
        }
        const matches = Array.from(node.querySelectorAll(selector));
        if (node.matches(selector)) {
            matches.unshift(node);
        }
        return matches;
    };
    return new MutationObserver((mutations_list) => {
        mutations_list.forEach((mutation) => {
            mutation.addedNodes.forEach((added_node) => {
                getMatches(added_node).forEach(onInputAdded);
            });
            mutation.removedNodes.forEach((removed_node) => {
                getMatches(removed_node).forEach(onInputRemoved);
            });
        });
    });
};

;// CONCATENATED MODULE: ./src/inject/dom/find_closest_input.ts
// can be more optimised, but ¯\_(ツ)_/¯, typically common container is just 2-3 levels higher
const findClosestInput = (el) => {
    const inputEl = el.querySelector("div[data-testid^=\"tweetTextarea_\"][role=\"textbox\"], div[data-testid^=\"tweetTextarea_\"][contenteditable=\"true\"]");
    if (inputEl) {
        return inputEl;
    }
    if (!el.parentElement) {
        return null;
    }
    else {
        return findClosestInput(el.parentElement);
    }
};

;// CONCATENATED MODULE: ./src/inject/utils/generate_text.ts
const generateText = (props) => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'generate_tweet', props }, response => resolve(response));
    });
};

;// CONCATENATED MODULE: ./src/inject/dom/set_input_text.ts
const setInputText = async (el, text) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.setData("text/plain", text);
    el.dispatchEvent(new ClipboardEvent("paste", {
        clipboardData: dataTransfer,
        bubbles: true,
        cancelable: true,
    }));
    dataTransfer.clearData();
};

;// CONCATENATED MODULE: ./src/background/chat_gpt_client/locales.ts
const locales = {
    "af-ZA": [
        "Afrikaans",
        "Afrikaans"
    ],
    "ar": [
        "العربية",
        "Arabic"
    ],
    "bg-BG": [
        "Български",
        "Bulgarian"
    ],
    "ca-AD": [
        "Català",
        "Catalan"
    ],
    "cs-CZ": [
        "Čeština",
        "Czech"
    ],
    "cy-GB": [
        "Cymraeg",
        "Welsh"
    ],
    "da-DK": [
        "Dansk",
        "Danish"
    ],
    "de-AT": [
        "Deutsch (Österreich)",
        "German (Austria)"
    ],
    "de-CH": [
        "Deutsch (Schweiz)",
        "German (Switzerland)"
    ],
    "de-DE": [
        "Deutsch (Deutschland)",
        "German (Germany)"
    ],
    "el-GR": [
        "Ελληνικά",
        "Greek"
    ],
    "en-GB": [
        "English (UK)",
        "English (UK)"
    ],
    "en-US": [
        "English (US)",
        "English (US)"
    ],
    "es-CL": [
        "Español (Chile)",
        "Spanish (Chile)"
    ],
    "es-ES": [
        "Español (España)",
        "Spanish (Spain)"
    ],
    "es-MX": [
        "Español (México)",
        "Spanish (Mexico)"
    ],
    "et-EE": [
        "Eesti keel",
        "Estonian"
    ],
    "eu": [
        "Euskara",
        "Basque"
    ],
    "fa-IR": [
        "فارسی",
        "Persian"
    ],
    "fi-FI": [
        "Suomi",
        "Finnish"
    ],
    "fr-CA": [
        "Français (Canada)",
        "French (Canada)"
    ],
    "fr-FR": [
        "Français (France)",
        "French (France)"
    ],
    "he-IL": [
        "עברית",
        "Hebrew"
    ],
    "hi-IN": [
        "हिंदी",
        "Hindi"
    ],
    "hr-HR": [
        "Hrvatski",
        "Croatian"
    ],
    "hu-HU": [
        "Magyar",
        "Hungarian"
    ],
    "id-ID": [
        "Bahasa Indonesia",
        "Indonesian"
    ],
    "is-IS": [
        "Íslenska",
        "Icelandic"
    ],
    "it-IT": [
        "Italiano",
        "Italian"
    ],
    "ja-JP": [
        "日本語",
        "Japanese"
    ],
    "km-KH": [
        "ភាសាខ្មែរ",
        "Khmer"
    ],
    "ko-KR": [
        "한국어",
        "Korean"
    ],
    "la": [
        "Latina",
        "Latin"
    ],
    "lt-LT": [
        "Lietuvių kalba",
        "Lithuanian"
    ],
    "lv-LV": [
        "Latviešu",
        "Latvian"
    ],
    "mn-MN": [
        "Монгол",
        "Mongolian"
    ],
    "nb-NO": [
        "Norsk bokmål",
        "Norwegian (Bokmål)"
    ],
    "nl-NL": [
        "Nederlands",
        "Dutch"
    ],
    "nn-NO": [
        "Norsk nynorsk",
        "Norwegian (Nynorsk)"
    ],
    "pl-PL": [
        "Polski",
        "Polish"
    ],
    "pt-BR": [
        "Português (Brasil)",
        "Portuguese (Brazil)"
    ],
    "pt-PT": [
        "Português (Portugal)",
        "Portuguese (Portugal)"
    ],
    "ro-RO": [
        "Română",
        "Romanian"
    ],
    "ru-RU": [
        "Русский",
        "Russian"
    ],
    "sk-SK": [
        "Slovenčina",
        "Slovak"
    ],
    "sl-SI": [
        "Slovenščina",
        "Slovenian"
    ],
    "sr-RS": [
        "Српски / Srpski",
        "Serbian"
    ],
    "sv-SE": [
        "Svenska",
        "Swedish"
    ],
    "th-TH": [
        "ไทย",
        "Thai"
    ],
    "tr-TR": [
        "Türkçe",
        "Turkish"
    ],
    "uk-UA": [
        "Українська",
        "Ukrainian"
    ],
    "ur-PK": [
        "اردو",
        "Urdu"
    ],
    "vi-VN": [
        "Tiếng Việt",
        "Vietnamese"
    ],
    "zh-CN": [
        "中文 (中国大陆)",
        "Chinese (PRC)"
    ],
    "zh-TW": [
        "中文 (台灣)",
        "Chinese (Taiwan)"
    ]
};
const defaultLocale = 'en-US';

;// CONCATENATED MODULE: ./src/inject/inject.ts






const onToolBarAdded = (toolBarEl) => {
    let inputEl = findClosestInput(toolBarEl);
    if (inputEl) {
        addGPTButton(toolBarEl, async (type, topic) => {
            toolBarEl.click();
            const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
            let replyTo = undefined;
            if (!!replyToTweet) {
                const textEl = replyToTweet.querySelector("div[data-testid=\"tweetText\"]");
                if (!textEl || !textEl.textContent) {
                    showErrorButton(toolBarEl);
                    return;
                }
                replyTo = textEl.textContent;
            }
            const text = await generateText({
                locale: (await chrome.storage.local.get('language')).language ?? defaultLocale,
                type,
                replyTo,
                topic
            });
            if (text) {
                inputEl = findClosestInput(toolBarEl);
                if (inputEl) {
                    setInputText(inputEl, text);
                }
            }
            else { // show error
                showErrorButton(toolBarEl);
            }
        });
    }
};
const onToolBarRemoved = (toolBarEl) => { };
// observe dom tree to detect all tweet inputs once they are created
const toolbarSelector = "div[data-testid=\"toolBar\"]";
const toolbarObserver = createObserver(toolbarSelector, onToolBarAdded, onToolBarRemoved);
const reactRoot = document.querySelector("#react-root");
if (reactRoot) {
    document.querySelectorAll(toolbarSelector).forEach(onToolBarAdded);
    toolbarObserver.observe(reactRoot, { subtree: true, childList: true });
}

/******/ })()
;