(() => {
  var __create = Object.create;
  var __getProtoOf = Object.getPrototypeOf;
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __toESM = (mod, isNodeMode, target) => {
    target = mod != null ? __create(__getProtoOf(mod)) : {};
    const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => mod[key],
          enumerable: true
        });
    return to;
  };
  var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

  // src/utils/wait.ts
  var wait = (timeout) => {
    return new Promise((res) => setTimeout(() => res(null), timeout));
  };

  // src/shared/storage_keys.ts
  var STORAGE_KEYS = {
    language: "language",
    isAddSignature: "isAddSignature",
    isAddTopicForReplies: "isAddTopicForReplies",
    lastTopic: "lastTopic"
  };

  // src/inject/dom/find_closest_input.ts
  var inputSelector = "div[data-testid^='tweetTextarea_'][role='textbox'], div[data-testid^='tweetTextarea_'][contenteditable='true']";
  var findClosestInput = (el) => {
    const contentEditableEl = el.querySelector(inputSelector);
    if (contentEditableEl) {
      return contentEditableEl;
    }
    if (!el.parentElement) {
      return null;
    } else {
      return findClosestInput(el.parentElement);
    }
  };

  // src/inject/dom/add_gpt_button.ts
  var gptIconSrc = chrome.runtime.getURL("icons/button.svg");
  var gptIconErrorSrc = chrome.runtime.getURL("icons/button_error.svg");
  var PLACEHOLDER_TOPIC = "Twitter";
  var DRAFT_COUNT = 5;
  var maybeReturnTopic = async () => {
    const replyToTweet = document.querySelector('article[data-testid="tweet"][tabindex="-1"]');
    if (!replyToTweet) {
      return PLACEHOLDER_TOPIC;
    }
    const state = await chrome.storage.local.get([STORAGE_KEYS.isAddTopicForReplies, STORAGE_KEYS.lastTopic]);
    if (!state.isAddTopicForReplies) {
      return;
    }
    const topic = window.prompt("What do you want to tweet about?", state.lastTopic ?? "") || PLACEHOLDER_TOPIC;
    await chrome.storage.local.set({ [STORAGE_KEYS.lastTopic]: topic });
    return topic;
  };
  var addGPTButton = (toolbarEl, generate, onPick, openNow) => {
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
    const iconWrap = doc.querySelector('div[id="gptButton"]');
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
    };
    iconWrap.onclick = open;
    if (openNow) {
      open();
    }
  };
  var openPicker = (anchor, toolbarEl) => {
    const container = document.createElement("div");
    container.classList.add("gptSelectorContainer");
    container.onclick = (e) => e.stopPropagation();
    container.onmousedown = (e) => e.preventDefault();
    const inputEl = findClosestInput(toolbarEl);
    const pageBackground = [document.body, document.documentElement].map((el) => getComputedStyle(el).backgroundColor).find((color) => color !== "rgba(0, 0, 0, 0)");
    if (inputEl && pageBackground) {
      container.style.backgroundColor = pageBackground;
      container.style.color = getComputedStyle(inputEl).color;
    }
    const openedAt = location.href;
    const navigationWatch = window.setInterval(() => {
      if (location.href !== openedAt) {
        close();
      }
    }, 500);
    const close = () => {
      window.clearInterval(navigationWatch);
      document.body.removeEventListener("click", close);
      container.remove();
    };
    const drafts = document.createElement("div");
    for (let i = 0;i < DRAFT_COUNT; i += 1) {
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
      window.open(url, "_blank")?.focus();
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
    window.setTimeout(() => document.body.addEventListener("click", close), 1);
    const show = (texts, onPick) => {
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
  };
  var showErrorButton = async (toolbarEl) => {
    const gptIcon = toolbarEl.querySelector(".gptIcon");
    if (gptIcon) {
      gptIcon.setAttribute("src", gptIconErrorSrc);
      gptIcon.classList.add("error");
    }
    await wait(5000);
    gptIcon?.setAttribute("src", gptIconSrc);
    gptIcon?.classList.remove("error");
  };

  // src/inject/dom/create_observer.ts
  var createObserver = (selector, onInputAdded, onInputRemoved) => {
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

  // src/inject/utils/generate_text.ts
  var generateTexts = (props) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "generate_tweet", props }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          resolve(undefined);
          return;
        }
        resolve(response);
      });
    });
  };

  // src/inject/dom/set_input_text.ts
  var setInputText = async (el, text) => {
    const dataTransfer = new DataTransfer;
    dataTransfer.setData("text/plain", text);
    el.dispatchEvent(new ClipboardEvent("paste", {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true
    }));
    dataTransfer.clearData();
  };

  // src/shared/locales.ts
  var locales = {
    "af-ZA": [
      "Afrikaans",
      "Afrikaans"
    ],
    ar: [
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
    eu: [
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
    la: [
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
  var defaultLocale = "en-US";

  // src/inject/inject.ts
  var findReplyTweet = () => document.querySelector('article[data-testid="tweet"][tabindex="-1"]');
  var replyTextOf = (tweetEl) => tweetEl.querySelector('div[data-testid="tweetText"]')?.textContent || undefined;
  var lastAutoDraftedTweet;
  var onToolBarAdded = (toolBarEl) => {
    if (!findClosestInput(toolBarEl)) {
      return;
    }
    const generate = async (topic) => {
      const replyToTweet2 = findReplyTweet();
      let replyTo2 = undefined;
      if (replyToTweet2) {
        replyTo2 = replyTextOf(replyToTweet2);
        if (!replyTo2) {
          return;
        }
      }
      return generateTexts({
        locale: (await chrome.storage.local.get(STORAGE_KEYS.language))[STORAGE_KEYS.language] ?? defaultLocale,
        replyTo: replyTo2,
        topic
      });
    };
    const insert = (text) => {
      toolBarEl.click();
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
  };
  var onInputAdded = (inputEl) => {
    if (findReplyTweet() && document.activeElement !== inputEl) {
      inputEl.focus({ preventScroll: true });
    }
  };
  var onToolBarRemoved = (toolBarEl) => {};
  var toolbarSelector = 'div[data-testid="toolBar"]';
  var toolbarObserver = createObserver(toolbarSelector, onToolBarAdded, onToolBarRemoved);
  var reactRoot = document.querySelector("#react-root");
  if (reactRoot) {
    document.querySelectorAll(inputSelector).forEach(onInputAdded);
    document.querySelectorAll(toolbarSelector).forEach(onToolBarAdded);
    createObserver(inputSelector, onInputAdded, () => {}).observe(reactRoot, { subtree: true, childList: true });
    toolbarObserver.observe(reactRoot, { subtree: true, childList: true });
  }
})();
