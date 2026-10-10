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

  // src/shared/helper_protocol.ts
  var HELPER_PROTOCOL_VERSION = 1;
  var HELPER_GENERATE_OP = "tweet.generate";
  var HELPER_BASE_URL = "http://127.0.0.1:31415";

  // src/shared/normalize_tweet.ts
  var stripLeadingLabel = (value) => {
    return value.replace(/^(?:[-*•]\s*|\d+[.)]\s+)+/u, "").trim().replace(/^(?:tweet|reply|response|answer)\s*[:：]\s*/iu, "").trim();
  };
  var stripGenericAiOpener = (value) => {
    let result = value.trim();
    for (let i = 0;i < 3; i += 1) {
      const before = result;
      result = result.replace(/^(?:great|nice|good|awesome|amazing)\s+(?:job|work|point|question|call|progress)(?:[^.!?]{0,80})?[.!?]\s*/iu, "").replace(/^(?:love this|absolutely|totally|well said|good question|great question|interesting question)[.!?,\s]+/iu, "").replace(/^(?:i think|honestly|to be honest|in my opinion|imo)[,\s]+/iu, "").trim();
      if (result === before)
        break;
    }
    return stripLeadingLabel(result);
  };
  var removeAiPunctuation = (value) => {
    return value.replace(/\s*[—–]\s*/gu, ", ").replace(/\s{2,}/gu, " ").replace(/\s+,/gu, ",").replace(/,\s*([.!?])/gu, "$1").trim();
  };
  var hasInnerQuote = (inner, open, close) => {
    const withoutApostrophes = inner.replace(/(?<=\p{L})['’](?=\p{L})/gu, "");
    return withoutApostrophes.includes(open) || withoutApostrophes.includes(close);
  };
  var normalizeTweetText = (raw, maxChars) => {
    let text = raw.trim();
    text = text.replace(/^```(?:\w+)?\s*/u, "").replace(/\s*```$/u, "").trim();
    text = text.replace(/`+/gu, "").trim();
    text = text.replace(/[\r\n\t]+/gu, " ").replace(/\s{2,}/gu, " ").trim();
    text = stripGenericAiOpener(stripLeadingLabel(text));
    const quotePairs = [
      ['"', '"'],
      ["'", "'"],
      ["“", "”"],
      ["‘", "’"],
      ["«", "»"]
    ];
    for (const [open, close] of quotePairs) {
      if (text.startsWith(open) && text.endsWith(close) && text.length >= open.length + close.length) {
        const inner = text.slice(open.length, text.length - close.length);
        if (hasInnerQuote(inner, open, close))
          break;
        text = stripGenericAiOpener(stripLeadingLabel(inner.trim()));
        break;
      }
    }
    text = text.replace(/\s*[—-]\s*tweetGPT\s*$/iu, "").replace(/\s*tweetGPT\s*$/iu, "").trim();
    text = removeAiPunctuation(stripGenericAiOpener(text));
    if (!text || text.length > maxChars) {
      return;
    }
    return text;
  };

  // src/background/local_helper_client.ts
  var DEFAULT_TIMEOUT_MS = 30000;
  var showNotification = (title, message) => {
    chrome.notifications.create(`TweetGPT:${Date.now()}`, {
      type: "basic",
      iconUrl: "./icons/32.png",
      title,
      message,
      priority: 2
    });
  };
  var makeRequestId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };
  var fetchWithTimeout = async (url, init, timeoutMs) => {
    const controller = new AbortController;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  };
  var isAbortError = (error) => error instanceof Error && error.name === "AbortError";

  class LocalHelperClient {
    async generateTweets(props, options) {
      const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
      const request = {
        v: HELPER_PROTOCOL_VERSION,
        id: makeRequestId(),
        op: HELPER_GENERATE_OP,
        locale: props.locale,
        ...props.topic && props.topic.trim() ? { topic: props.topic.trim() } : {},
        ...props.replyTo && props.replyTo.trim() ? { replyTo: props.replyTo.trim() } : {},
        maxChars: options.maxChars,
        timeoutMs
      };
      const controller = new AbortController;
      const timeout = setTimeout(() => controller.abort(), timeoutMs + 5000);
      try {
        const response = await fetch(`${HELPER_BASE_URL}/v1/generate-tweet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: controller.signal
        });
        const body = await response.json();
        if (!response.ok || !body.ok) {
          const message = body.ok ? `HTTP ${response.status}` : body.error.message;
          showNotification("TweetGPT generation failed", message);
          return;
        }
        const texts = body.texts.flatMap((text) => normalizeTweetText(text, options.maxChars) ?? []);
        if (texts.length === 0) {
          showNotification("TweetGPT generation failed", "Helper returned empty or over-long tweet text.");
          return;
        }
        return texts;
      } catch (error) {
        const message = controller.signal.aborted ? "Helper request timed out." : "Helper is not running. Start it with: bun run --cwd helper dev";
        console.error(error);
        showNotification("TweetGPT helper error", message);
        return;
      } finally {
        clearTimeout(timeout);
      }
    }
    async checkConnection() {
      try {
        const healthResponse = await fetchWithTimeout(`${HELPER_BASE_URL}/health`, { method: "GET" }, 5000);
        if (!healthResponse.ok) {
          return { reachable: false, message: `Helper health returned HTTP ${healthResponse.status}.` };
        }
        const health = await healthResponse.json();
        const base = {
          reachable: true,
          authConfigured: health.auth.configured,
          mode: health.mode,
          model: `${health.provider}/${health.model}`,
          message: `Helper reachable (${health.mode}, ${health.provider}/${health.model}).`
        };
        const probe = await fetchWithTimeout(`${HELPER_BASE_URL}/v1/generate-tweet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            v: HELPER_PROTOCOL_VERSION,
            id: makeRequestId(),
            op: HELPER_GENERATE_OP,
            locale: "en-US",
            topic: "helper connection test",
            maxChars: 120,
            timeoutMs: 1e4
          })
        }, 15000);
        const body = await probe.json();
        if (probe.status === 403 || !body.ok && body.error.code === "forbidden") {
          return { ...base, message: `${base.message} Helper rejected this extension (ID ${chrome.runtime.id}).` };
        }
        if (!body.ok) {
          return { ...base, message: `${base.message} Generation failed: ${body.error.message}` };
        }
        return { ...base, message: `${base.message} Test tweet generated.` };
      } catch (error) {
        console.error(error);
        return {
          reachable: false,
          message: isAbortError(error) ? "Helper check timed out." : "Helper is not running. Start it with: bun run --cwd helper dev"
        };
      }
    }
  }

  // src/shared/storage_keys.ts
  var STORAGE_KEYS = {
    language: "language",
    isAddSignature: "isAddSignature",
    isAddTopicForReplies: "isAddTopicForReplies",
    lastTopic: "lastTopic"
  };

  // src/background/background.ts
  var xMatches = ["https://twitter.com/*", "https://x.com/*"];
  var allowedOrigins = new Set(["https://twitter.com", "https://x.com"]);
  chrome.scripting.registerContentScripts([
    {
      id: `main_context_inject_${Math.random()}`,
      world: "ISOLATED",
      matches: xMatches,
      js: ["lib/inject.js"],
      css: ["css/inject.css"]
    }
  ]);
  var helperClient = new LocalHelperClient;
  var isAllowedSender = (sender) => {
    if (!sender.tab?.url)
      return true;
    try {
      return allowedOrigins.has(new URL(sender.tab.url).origin);
    } catch {
      return false;
    }
  };
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message?.type) {
      return false;
    }
    switch (message.type) {
      case "generate_tweet":
        (async () => {
          if (!isAllowedSender(sender)) {
            sendResponse(undefined);
            return;
          }
          const savedSettings = await chrome.storage.local.get(STORAGE_KEYS.isAddSignature);
          const isAddSignature = savedSettings[STORAGE_KEYS.isAddSignature] ?? false;
          const isReply = Boolean(message.props.replyTo?.trim());
          const naturalMaxChars = isReply ? 160 : 220;
          const signature = " - tweetGPT";
          const maxChars = isAddSignature ? Math.min(naturalMaxChars, 280 - signature.length) : naturalMaxChars;
          const texts = await helperClient.generateTweets(message.props, { maxChars });
          sendResponse(isAddSignature ? texts?.map((text) => `${text}${signature}`) : texts);
        })().catch((error) => {
          console.error(error);
          sendResponse(undefined);
        });
        return true;
      case "helper_health_check":
        helperClient.checkConnection().then(sendResponse, (error) => {
          console.error(error);
          sendResponse({ reachable: false, message: "Helper check failed." });
        });
        return true;
    }
    return false;
  });
})();
