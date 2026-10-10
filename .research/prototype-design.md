# Prototype Design

## Bottom line

Build one pure `generateTweet()` core and hang three adapters off it:

1. **Node HTTP helper + `@mariozechner/pi-ai`** = easiest POC, easiest to debug.
2. **Native Messaging host + same helper** = same core, better shipping/security story.
3. **Codex SDK wrapper** = best if you want Codex CLI semantics or JSON-schema output, but heavier.

Recommendation: **start with HTTP + pi-ai**. Keep the request schema transport-agnostic so the same core can later move to Native Messaging or Codex SDK with minimal churn.

---

## Files Retrieved

1. `src/inject/inject.ts` (lines 1-47) - page-side capture of tweet context; first hop into the bridge.
2. `src/background/background.ts` (lines 1-53) - current service-worker message bridge and signature append.
3. `src/background/chat_gpt_client/chat_gpt_client.ts` (lines 1-95) - direct OpenAI fetch + token storage; main replacement point.
4. `src/settings/settings_screen.tsx` (lines 1-97) - current token/settings UI in `chrome.storage.local`.
5. `manifest.json` (lines 1-32) - current permissions/host restrictions; must change for localhost or native messaging.
6. `package.json` (lines 1-30) - current extension runtime/build deps; shows no helper workspace yet.
7. `webpack.config.js` (lines 1-28) - current extension bundle entries; helper should stay outside this build.
8. `.repos/pi-mono/packages/ai/package.json` (lines 1-107) - `@mariozechner/pi-ai` package choice and Node floor.
9. `.repos/pi-mono/packages/ai/src/stream.ts` (lines 25-59) - `completeSimple` / `streamSimple`.
10. `.repos/pi-mono/packages/ai/src/types.ts` (lines 74-115, 137-144, 253-257) - `signal`, `timeoutMs`, `SimpleStreamOptions`, `Context`.
11. `.repos/pi-mono/packages/ai/src/utils/oauth/index.ts` (lines 1-23) and `.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts` (lines 301-451) - Codex OAuth/login and credential shape.
12. `.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts` (lines 120-220, 315-347) - `transport`, `sessionId`, request body, `prompt_cache_key`.
13. `.repos/pi-mono/packages/ai/README.md` (lines 1133-1214) - login commands, `auth.json`, session-caching note, transport knobs.
14. `.repos/codex/sdk/typescript/package.json` (lines 1-67) - `@openai/codex-sdk` package choice and Node floor.
15. `.repos/codex/sdk/typescript/README.md` (lines 1-149) - Codex CLI wrapper, `Thread.run`, `outputSchema`, env, `skipGitRepoCheck`.
16. `.repos/codex/sdk/typescript/src/turnOptions.ts` (lines 1-5) and `.repos/codex/sdk/typescript/src/exec.ts` (lines 147-167) - cancel via `signal` and subprocess spawn.

## Key Code

### Current bridge entry

```ts
chrome.runtime.sendMessage({ type: 'generate_tweet', props }, response => resolve(response));
```
`src/inject/utils/generate_text.ts` (lines 3-6)

`background.ts` currently receives that request and returns the final string:

```ts
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  switch (message.type) {
    case 'generate_tweet':
      gptChat.generateTweet(message.props).then(async (text) => {
        // ...signature append...
        sendResponse(finalText);
      });
  }
  return true;
});
```
`src/background/background.ts` (lines 26-53)

### pi-ai helper primitives

```ts
export function completeSimple<TApi extends Api>(model, context, options?): Promise<AssistantMessage>
export interface Context {
  systemPrompt?: string;
  messages: Message[];
  tools?: Tool[];
}
export interface StreamOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  sessionId?: string;
}
```
`.repos/pi-mono/packages/ai/src/stream.ts` (lines 25-59) and `.repos/pi-mono/packages/ai/src/types.ts` (lines 74-115, 253-257)

### Codex wrapper primitives

```ts
const turn = await thread.run(prompt, {
  outputSchema,
  signal,
});
```
`.repos/codex/sdk/typescript/README.md` (lines 53-84) and `.repos/codex/sdk/typescript/src/turnOptions.ts` (lines 1-5)

```ts
const child = spawn(this.executablePath, commandArgs, {
  env,
  signal: args.signal,
});
```
`.repos/codex/sdk/typescript/src/exec.ts` (lines 147-167)

### Codex transport knobs

```ts
const body = {
  model: model.id,
  store: false,
  stream: true,
  instructions: context.systemPrompt,
  input: messages,
  text: { verbosity: options?.textVerbosity || "low" },
  include: ["reasoning.encrypted_content"],
  prompt_cache_key: options?.sessionId,
  tool_choice: "auto",
  parallel_tool_calls: true,
};
```
`.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts` (lines 324-347)


## Current repo shape

The current extension is already split the right way:

- `src/inject/inject.ts` captures tweet context and asks the background worker for generated text.
- `src/background/background.ts` is the current service-worker bridge and post-processes the text.
- `src/background/chat_gpt_client/chat_gpt_client.ts` does the actual OpenAI call today.
- `src/settings/settings_screen.tsx` stores the OpenAI token and UX flags in `chrome.storage.local`.
- `manifest.json` currently only allows Twitter + OpenAI, so localhost/native host permissions are not in place.

That means the helper work is mostly a **background/transport swap**, not a full extension rewrite.

---

## Shared POC contract

Keep the browser bridge tiny and versioned.

### Request envelope

```json
{
  "v": 1,
  "id": "req_01H...",
  "op": "tweet.generate",
  "type": "supportive",
  "locale": "en-US",
  "topic": "local helper",
  "replyTo": "optional quoted tweet text",
  "timeoutMs": 30000
}
```

### Response envelope

```json
{
  "v": 1,
  "id": "req_01H...",
  "ok": true,
  "text": "generated tweet text",
  "model": "optional-model-id",
  "usage": {
    "inputTokens": 123,
    "outputTokens": 42,
    "totalTokens": 165
  },
  "elapsedMs": 1820
}
```

### Error envelope

```json
{
  "v": 1,
  "id": "req_01H...",
  "ok": false,
  "error": {
    "code": "timeout",
    "message": "request exceeded 30000ms",
    "retryable": true
  }
}
```

Suggested error codes:

- `bad_request`
- `auth_missing`
- `timeout`
- `cancelled`
- `upstream_error`
- `transport_error`

### Cancel

Use the same envelope with:

```json
{ "v": 1, "id": "req_02", "op": "cancel", "requestId": "req_01" }
```

Rules:

- `timeoutMs` is enforced on both sides.
- client abort should stop the browser request immediately.
- helper should also abort the upstream model call.
- if the port/socket dies, treat it as cancel.

---

## Architecture

```
Twitter UI
  -> content script
  -> background service worker
  -> bridge adapter
  -> pure tweet handler
  -> engine (pi-ai or Codex SDK)
  -> response
  -> background post-process (signature, errors)
  -> content script inserts text
```

Key separation:

- **content script**: DOM only, no model/network logic
- **background**: transport + cancel + timeout + signature append
- **core handler**: request -> prompt -> engine call -> response
- **engine**: `@mariozechner/pi-ai` or `@openai/codex-sdk`

That makes transport swapping cheap.

---

## Option A: Node HTTP helper using `@mariozechner/pi-ai`

### What it is

A small local Node service on `127.0.0.1` with one POST endpoint, e.g. `/v1/message`.
The browser talks to it from the background worker via `fetch()`.
The helper uses `@mariozechner/pi-ai` for the actual model call.

### Package choices

Core:

- `@mariozechner/pi-ai` for text generation
- `zod` for request/response validation
- `node:http` built-in for the server

Dev/build:

- `typescript`
- `tsx` for local dev
- `@types/node`

Optional:

- `@mariozechner/pi-ai/oauth` if you want ChatGPT Plus/Pro subscription login instead of API keys
- `pino` if you want structured logs

### Why this fits the repo

`pi-ai` already exposes the exact low-level helper you want:

- `completeSimple(model, context, options)`
- `streamSimple(model, context, options)`
- `Context = { systemPrompt?, messages, tools? }`
- `StreamOptions` already carries `signal` and `timeoutMs`

So the helper can stay very small and deterministic.

### Core request mapping

The helper should turn the bridge envelope into a `Context` like this:

```ts
const context = {
  systemPrompt: `You are a ghostwriter for user tweets. Use locale "${locale}". Return only one tweet. Keep it short.`,
  messages: [
    {
      role: "user",
      content: `Write a ${type} tweet${topic ? ` about ${topic}` : ""}${replyTo ? ` in reply to a tweet "${replyTo}"` : ""}`,
    },
  ],
};

const result = await completeSimple(model, context, {
  apiKey,
  timeoutMs,
  signal,
});
```

For a tweet helper, start with `completeSimple()`.
Only switch to `streamSimple()` if you want token-by-token UI feedback.

### Auth choice

Two viable modes:

- **API key**: set `OPENAI_API_KEY` (or helper-specific env) and keep it in helper-owned config only.
- **Codex subscription**: use `loginOpenAICodex()` / `getOAuthApiKey()` from `@mariozechner/pi-ai/oauth` and store creds in a helper-local `auth.json`.

For a POC, API key is the least moving parts.

### Stateliness

For the POC, keep it stateless:

- no session reuse
- no websocket reuse
- no helper-side conversation memory

If you do use OpenAI Codex transport, set `transport: "sse"` and omit `sessionId` so the request stays one-shot.

### Install/start commands

```bash
cd helper-http
npm init -y
npm i @mariozechner/pi-ai zod
npm i -D typescript tsx @types/node
```

Dev start:

```bash
HELPER_PORT=31415 npx tsx src/server.ts
```

If using subscription auth:

```bash
npx @mariozechner/pi-ai login openai-codex
```

### Smoke test

```bash
curl -s http://127.0.0.1:31415/healthz

curl -s -X POST http://127.0.0.1:31415/v1/message \
  -H 'Content-Type: application/json' \
  -d '{"v":1,"id":"smoke-1","op":"tweet.generate","type":"supportive","locale":"en-US","topic":"local helper","timeoutMs":30000}'
```

Expected:

- `healthz` returns `{"ok":true}`
- tweet endpoint returns `ok:true` and non-empty `text`
- `timeoutMs: 1` should return a timeout error fast

### Pros

- easiest to build and debug
- curl-friendly smoke tests
- no OS installer friction
- helper can later be wrapped by Native Messaging without changing core logic

### Cons

- open local port
- needs localhost permissions in the extension manifest
- security review needs bearer-token or origin checks if the port is exposed beyond `127.0.0.1`

---

## Option B: Native Messaging host wrapping the same helper

### What it is

Same core helper as Option A, but the browser talks to it via Chrome Native Messaging instead of HTTP.
Use `connectNative()` for a persistent port so cancel is possible.

### Package choices

Same engine/core packages as Option A:

- `@mariozechner/pi-ai`
- `zod`
- `typescript`
- `tsx`
- `@types/node`

Plus browser-side changes:

- extension manifest `permissions: ["nativeMessaging"]`
- native host manifest file

### Why this fits

This is the same handler, just a different adapter.
The host process can keep the exact same `tweet.generate` / `cancel` schema.

### Transport rules

- background worker opens a native port with `chrome.runtime.connectNative(...)`
- each request gets an `id`
- helper maps `id -> AbortController`
- `cancel` message or port close aborts the in-flight request
- host replies with the same JSON envelope as the HTTP version

### Install/start commands

Build the host:

```bash
cd helper-native
npm init -y
npm i @mariozechner/pi-ai zod
npm i -D typescript tsx @types/node
npm run build
```

Register the native host manifest on the OS:

- macOS: `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/`
- Linux: `~/.config/google-chrome/NativeMessagingHosts/` or Chromium equivalent
- Windows: registry key under `HKCU\Software\Google\Chrome\NativeMessagingHosts`

The browser launches the host on demand; there is no manual daemon start.

### Smoke test

Best approach:

1. run a tiny host-level harness that feeds a `ping` / `tweet.generate` frame to the host executable
2. load the unpacked extension and click a `Test helper` button if you add one

Minimal harness idea:

```bash
node scripts/native-smoke.mjs com.example.tweetgpt '{"v":1,"id":"smoke-1","op":"ping"}'
```

Expected:

- `ping` round-trips
- `tweet.generate` returns the same `ok:true/text` shape as HTTP
- `cancel` kills the current request without restarting the host

### Pros

- no open TCP port
- better browser-install story than a localhost daemon
- same core code as HTTP option
- persistent port makes cancel/streaming clean

### Cons

- more install friction
- OS-specific host registration
- harder to debug than curl
- packaging/update story is more annoying than a simple daemon

### When to choose it

Choose this if the helper is meant for real users, not just local dev.

---

## Option C: Codex SDK process wrapper

### What it is

A local Node wrapper around `@openai/codex-sdk`.
The wrapper can be exposed over HTTP or Native Messaging, but the important swap is the **engine**: instead of `pi-ai`, use Codex SDK.

### Package choices

- `@openai/codex-sdk`
- `zod`
- `typescript`
- `tsx`
- `@types/node`

### Why this is different

The SDK does not just call an HTTP API.
It wraps the Codex CLI, spawns a child process, and exchanges JSONL events over stdin/stdout.
The SDK also supports:

- `Thread.run(...)`
- `Thread.runStreamed(...)`
- structured output via `outputSchema`
- `AbortSignal` cancellation
- env overrides

### POC request mapping

Use the same extension envelope, but let the helper ask Codex for structured output:

```ts
const outputSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
  },
  required: ["text"],
  additionalProperties: false,
} as const;

const turn = await thread.run(prompt, {
  outputSchema,
  signal,
});

return { ok: true, text: turn.finalResponse.text };
```

This is the only option here where the model can be told to emit structured JSON natively instead of post-parsing plain text.

### Important gotchas

- `Codex` defaults to a Git-repo working directory; set `skipGitRepoCheck: true` if the helper runs outside a repo.
- The SDK persists threads in `~/.codex/sessions`, so a one-shot tweet helper still inherits Codex session semantics unless you explicitly avoid reuse.
- This is heavier than the pi-ai HTTP path for a simple tweet generator.

### Install/start commands

```bash
cd helper-codex
npm init -y
npm i @openai/codex-sdk zod
npm i -D typescript tsx @types/node
```

Auth/setup:

```bash
# option A: API key
export CODEX_API_KEY=...

# option B: subscription login / CLI auth, if that is the chosen Codex flow
codex /login
```

Run the wrapper:

```bash
npx tsx src/wrapper.ts
```

### Smoke test

```bash
node --input-type=module <<'EOF'
import { Codex } from "@openai/codex-sdk";

const codex = new Codex({ env: { CODEX_API_KEY: process.env.CODEX_API_KEY ?? "" } });
const thread = codex.startThread({ workingDirectory: process.cwd(), skipGitRepoCheck: true });

const turn = await thread.run("Return JSON {\"text\":\"pong\"}", {
  outputSchema: {
    type: "object",
    properties: { text: { type: "string" } },
    required: ["text"],
    additionalProperties: false,
  },
  signal: AbortSignal.timeout(30000),
});

console.log(turn.finalResponse);
EOF
```

Expected:

- valid JSON output
- `signal` abort works
- no manual parsing needed

### Pros

- structured output is first-class
- good fit if you want Codex CLI behavior, not just raw text
- cancel support is built in

### Cons

- heavier process model
- persistent thread/session behavior is extra baggage for a tweet helper
- not the simplest choice for a POC that just needs a tweet string

---

## Comparison matrix

| Option | Transport | Engine package | Cancel | Install friction | Best fit |
|---|---|---|---|---|---|
| HTTP helper | `fetch` to `127.0.0.1` | `@mariozechner/pi-ai` | `AbortController` + helper `AbortSignal` | low | POC, easiest debugging |
| Native Messaging | `connectNative()` | `@mariozechner/pi-ai` | port close or `cancel` message | medium/high | ship-ready companion app |
| Codex SDK wrapper | same browser bridge, different engine | `@openai/codex-sdk` | `signal` on `run()` / child-process abort | medium | structured output / Codex features |

---

## Extension-side impact if implemented

Likely touch points in this repo:

- `src/background/background.ts` — replace direct model call with helper client, add request IDs + cancel handling.
- `src/background/chat_gpt_client/chat_gpt_client.ts` — replace OpenAI fetch with helper adapter, or remove entirely.
- `src/settings/settings_screen.tsx` — replace OpenAI token UI with helper status / pairing config, or remove the token field.
- `manifest.json` — add localhost host permissions for HTTP, or `nativeMessaging` for native host.
- `src/inject/inject.ts` / `src/inject/utils/generate_text.ts` — likely no logic change beyond request ID propagation.

Keep the content script dumb; all bridge logic belongs in the background worker.

---

## Start Here

1. `src/background/background.ts` — current extension bridge entry.
2. `src/background/chat_gpt_client/chat_gpt_client.ts` — current direct OpenAI call to replace.
3. `.repos/pi-mono/packages/ai/src/stream.ts` and `.repos/pi-mono/packages/ai/src/types.ts` — simplest `pi-ai` helper API.
4. `.repos/codex/sdk/typescript/README.md` — if the Codex SDK wrapper becomes the chosen engine.
