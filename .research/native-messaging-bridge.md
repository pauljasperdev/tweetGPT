# Native Messaging Bridge for tweetGPT

## Verdict

- **No native messaging exists in this repo today.** Current path is content script -> extension service worker -> direct OpenAI fetch.
- **Exact bridge for a local helper should be `chrome.runtime.sendNativeMessage()` from the background service worker** for one-shot tweet generation.
- **`chrome.runtime.connectNative()` is optional** only if you want a persistent helper process or streaming/multi-call session state.
- **Content scripts cannot call native messaging.** Keep the inject layer unchanged; relay through `src/background/background.ts`.

## Files Retrieved

1. `manifest.json` (lines 3-31) - current MV3 manifest; shows current permissions, host permissions, and service worker entry. No `nativeMessaging` yet.
2. `src/background/background.ts` (lines 1-53) - current service-worker bridge and `chrome.runtime.onMessage` handler; best insertion point for native host calls.
3. `src/background/chat_gpt_client/chat_gpt_client.ts` (lines 1-95) - current direct `fetch()` to OpenAI and token storage; this is the code path to replace if helper owns model/auth.
4. `src/inject/utils/generate_text.ts` (lines 1-7) - content-script to service-worker message wrapper.
5. `src/inject/inject.ts` (lines 1-47) - gathers tweet/reply/topic context and sends `generate_tweet` requests.
6. `src/settings/settings_screen.tsx` (lines 12-80) - current UI stores `openAIToken` in `chrome.storage.local`; helper version should not keep long-lived auth there.
7. `webpack.config.js` (lines 3-28) and `package.json` (lines 8-12) - extension-only build; no native host packaging/build step exists yet.
8. `README.MD` (lines 3-20) - archived/unpacked install context; useful reminder that this repo is currently dev-load only.

## Key Code

### Current extension bridge

```ts
// src/inject/utils/generate_text.ts:3-6
chrome.runtime.sendMessage({type: 'generate_tweet', props}, response => resolve(response));
```

```ts
// src/background/background.ts:26-53
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  ...
  return true;
});
```

```ts
// src/background/chat_gpt_client/chat_gpt_client.ts:36-44
const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(body),
});
```

### Manifest baseline

```json
// manifest.json:6-26
"permissions": ["storage", "scripting", "notifications"],
"host_permissions": ["https://twitter.com/", "https://api.openai.com/"],
"background": { "service_worker": "lib/background.js" }
```

## Architecture

### Current flow

`inject.ts` -> `generateText()` -> `background.ts` -> `ChatGPTClient.generateTweet()` -> OpenAI fetch -> back to background -> content script inserts tweet.

### Native-messaging flow

`inject.ts` stays the same.
`background.ts` swaps `ChatGPTClient` for a helper client that wraps `chrome.runtime.sendNativeMessage()` or `chrome.runtime.connectNative()`.

The local helper/native host should own:
- model/CLI invocation
- any auth/login/refresh logic
- output sanitization
- rate-limit handling

The extension should only own:
- Twitter DOM capture
- UI
- marshaling `TweetProps`
- displaying result/error

## Native Messaging: exact requirements

### Extension manifest

Add:

```json
"permissions": ["storage", "scripting", "notifications", "nativeMessaging"]
```

Notes:
- `nativeMessaging` is required for both `connectNative()` and `sendNativeMessage()`.
- No `host_permissions` are needed for the native host itself.
- Content scripts still cannot call native messaging; only extension pages/service workers can.

### Native host manifest

Chrome docs require a valid JSON manifest with:
- `name`
- `description`
- `path`
- `type: "stdio"`
- `allowed_origins`

Example:

```json
{
  "name": "com.tweetgpt.helper",
  "description": "TweetGPT local helper",
  "path": "/absolute/path/to/tweetgpt-helper",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://<fixed-extension-id>/"
  ]
}
```

Rules from Chrome docs:
- `name` only lowercase alnum, `_`, `.`; no leading/trailing dot; no double dots.
- `path` must be **absolute** on macOS/Linux.
- `allowed_origins` values **cannot contain wildcards**.
- `type` is always `stdio` for Chrome native messaging.
- Chrome starts the host with cwd set to the directory containing the host binary.

### Native host install paths

Chrome docs list the manifest locations below.

#### macOS

- **System-wide**: `/Library/Google/Chrome/NativeMessagingHosts/<host>.json`
- **User-specific**: `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/<host>.json`

Chromium equivalents exist under `.../Chromium/NativeMessagingHosts/`.

#### Linux

- **System-wide**: `/etc/opt/chrome/native-messaging-hosts/<host>.json`
- **User-specific**: `~/.config/google-chrome/NativeMessagingHosts/<host>.json`

Chromium equivalents exist under `~/.config/chromium/NativeMessagingHosts/` and `/etc/chromium/native-messaging-hosts/`.

### Native host protocol

Chrome docs:
- host is launched as a separate process
- communication is via `stdin`/`stdout`
- each message is JSON, UTF-8 encoded
- each message is preceded by a **32-bit length prefix in native byte order**
- host->Chrome message max is **1 MB**
- Chrome->host message max is **64 MiB**
- `connectNative()` keeps the host alive until the port is destroyed
- `sendNativeMessage()` starts a fresh host process per message; only the first host message is treated as the response, later messages are ignored

### Background/service-worker API rule

- `runtime.connectNative()` and `runtime.sendNativeMessage()` are available in **extension pages and service workers**.
- They are **not available in content scripts**.
- So the current content-script -> SW -> response pattern is the right shape.

## TypeScript sketches

### 1) `sendNativeMessage()` one-shot bridge

Best default for tweet generation.

```ts
// src/background/native_helper_client.ts
import type { TweetProps } from "./chat_gpt_client/chat_gpt_client";

const HOST = "com.tweetgpt.helper";

type GenerateTweetReq = {
  type: "generate_tweet";
  props: TweetProps;
};

type GenerateTweetRes =
  | { ok: true; text: string }
  | { ok: false; error: string };

export class NativeHelperClient {
  async generateTweet(props: TweetProps): Promise<string | undefined> {
    return new Promise((resolve) => {
      chrome.runtime.sendNativeMessage(
        HOST,
        { type: "generate_tweet", props } satisfies GenerateTweetReq,
        (response: GenerateTweetRes | undefined) => {
          if (chrome.runtime.lastError || !response?.ok) {
            resolve(undefined);
            return;
          }

          resolve(response.text);
        },
      );
    });
  }
}
```

### 2) `connectNative()` persistent port bridge

Use only if you need streaming or multi-request session state.

```ts
// src/background/native_port_client.ts
import type { TweetProps } from "./chat_gpt_client/chat_gpt_client";

const HOST = "com.tweetgpt.helper";

type Request = {
  id: string;
  type: "generate_tweet";
  props: TweetProps;
};

type Response =
  | { id: string; ok: true; text: string }
  | { id: string; ok: false; error: string };

export class NativePortClient {
  private port = chrome.runtime.connectNative(HOST);
  private pending = new Map<string, (res: Response | undefined) => void>();

  constructor() {
    this.port.onMessage.addListener((msg: Response) => {
      const resolve = this.pending.get(msg.id);
      if (!resolve) return;
      this.pending.delete(msg.id);
      resolve(msg);
    });

    this.port.onDisconnect.addListener(() => {
      for (const resolve of this.pending.values()) resolve(undefined);
      this.pending.clear();
    });
  }

  generateTweet(props: TweetProps): Promise<string | undefined> {
    const id = crypto.randomUUID();
    return new Promise((resolve) => {
      this.pending.set(id, (msg) => {
        if (!msg?.ok) {
          resolve(undefined);
          return;
        }
        resolve(msg.text);
      });

      this.port.postMessage({ id, type: "generate_tweet", props } satisfies Request);
    });
  }
}
```

### 3) Node host `stdin`/`stdout` framing

This is the native host side. Compile TS to JS or ship a shebang JS wrapper.

```ts
// host.ts
import process from "node:process";

type HostRequest = {
  type: "generate_tweet";
  props: {
    type: string;
    topic?: string;
    locale: string;
    replyTo?: string;
  };
};

type HostResponse =
  | { ok: true; text: string }
  | { ok: false; error: string };

let buffer = Buffer.alloc(0);

process.stdin.on("data", (chunk: Buffer) => {
  buffer = Buffer.concat([buffer, chunk]);

  while (buffer.length >= 4) {
    const len = buffer.readUInt32LE(0);
    if (buffer.length < 4 + len) break;

    const payload = buffer.subarray(4, 4 + len).toString("utf8");
    buffer = buffer.subarray(4 + len);

    const req = JSON.parse(payload) as HostRequest;
    const res = handleRequest(req);
    writeMessage(res);

    // sendNativeMessage mode: exit after first response.
    // connectNative mode: keep reading.
  }
});

function writeMessage(msg: HostResponse) {
  const json = Buffer.from(JSON.stringify(msg), "utf8");
  const header = Buffer.alloc(4);
  header.writeUInt32LE(json.length, 0);
  process.stdout.write(header);
  process.stdout.write(json);
}

function handleRequest(req: HostRequest): HostResponse {
  try {
    if (req.type !== "generate_tweet") {
      return { ok: false, error: `unknown request: ${req.type}` };
    }

    // TODO: call local CLI / auth / model here.
    const text = `generated tweet for ${req.props.type}`;
    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown error" };
  }
}
```

## Unpacked-dev extension ID issue

Chrome native messaging host manifests use exact `chrome-extension://<id>/` origins.
There is **no wildcard**.

So for an unpacked/dev extension:
- the host manifest must list the exact runtime ID, or
- the extension must be pinned with a stable `key` in `manifest.json`, or packaged so the ID is stable.

Chrome’s `manifest/key` docs explicitly say a single ID is essential during development and that adding the packaged public key to `"key"` keeps the same ID.

Current repo note:
- `manifest.json` has **no** `"key"` field today, so the native host cannot be pre-pinned to a stable ID from the repo alone.
- For dev, load the unpacked extension, read `chrome.runtime.id`, then update the host manifest `allowed_origins` with that exact ID; or add a permanent `"key"` first.

## Start Here

1. `src/background/background.ts` - first bridge point; replace direct OpenAI client with native helper client.
2. `manifest.json` - add `nativeMessaging`, decide whether `api.openai.com` stays, and keep service worker path aligned.
3. Native host manifest + helper binary - new files outside current repo build; required to make the bridge real.

## Sources

- Chrome Native Messaging docs: https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging
- Chrome manifest `key` docs: https://developer.chrome.com/docs/extensions/reference/manifest/key/
