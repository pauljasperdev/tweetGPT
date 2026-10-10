# Code Context

## Files Retrieved
1. `manifest.json` (lines 6-31) - MV3 surface; only `twitter.com` + `api.openai.com` host perms; `externally_connectable` is twitter.com only.
2. `src/background/background.ts` (lines 1-53) - SW entry; injects content script; opens settings on install; runtime bridge `generate_tweet` -> `ChatGPTClient`.
3. `src/background/chat_gpt_client/chat_gpt_client.ts` (lines 1-95) - only outbound request today; direct OpenAI POST; missing-token fallback reopens settings.
4. `src/inject/inject.ts` (lines 1-47) - content-script -> background call site; collects locale/topic/reply text.
5. `src/inject/dom/add_gpt_button.ts` (lines 18-137) - topic prompt, settings link, error badge UX; current failure surface.
6. `src/settings/settings_screen.tsx` (lines 12-97) - current config UI/storage; natural helper URL/token/status place.
7. `.repos/opencode/packages/opencode/src/server/cors.ts` (lines 1-14) - localhost/127.0.0.1 CORS allowlist precedent.
8. `.repos/opencode/packages/opencode/src/server/middleware.ts` (lines 41-86) - OPTIONS-before-auth, Basic auth, CORS middleware pattern.
9. `.repos/opencode/packages/opencode/src/server/routes/global.ts` (lines 22-138) - exact `/health` shape + SSE headers + 10s heartbeat.
10. `.repos/opencode/packages/opencode/src/server/routes/instance/httpapi/middleware/authorization.ts` (lines 89-127) - token/header/query auth validation pattern.
11. `.repos/opencode/packages/opencode/src/cli/cmd/web.ts` (lines 39-83) - startup UX: insecure warning, localhost URL print, auto-open browser.
12. `.repos/opencode/packages/sdk/js/src/v2/gen/core/serverSentEvents.gen.ts` (lines 78-220) - fetch-based SSE parser w/ custom headers; use this, not EventSource, if auth header needed.

## Key Code
Current bridge:
```ts
// src/inject/utils/generate_text.ts
chrome.runtime.sendMessage({ type: 'generate_tweet', props }, response => resolve(response))
```

```ts
// src/background/background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  gptChat.generateTweet(message.props).then(text => sendResponse(text))
  return true
})
```

```ts
// src/background/chat_gpt_client/chat_gpt_client.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
  body: JSON.stringify(body),
})
```

```ts
// src/background/chat_gpt_client/chat_gpt_client.ts
if (!result[GPT_TOKEN_NAME]) chrome.tabs.create({ url: chrome.runtime.getURL('assets/settings.html') })
```

```ts
// src/background/chat_gpt_client/chat_gpt_client.ts
export type TweetProps = { type: string; topic?: string; locale: string; replyTo?: string }
```

opencode analogs:
```ts
if (input.startsWith('http://localhost:')) return true
if (input.startsWith('http://127.0.0.1:')) return true
```

```ts
if (c.req.method === 'OPTIONS') return next()
if (c.req.query('auth_token')) c.req.raw.headers.set('authorization', `Basic ${c.req.query('auth_token')}`)
```

```ts
return c.json({ healthy: true, version: InstallationVersion })
```

```ts
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
```

## Architecture
- Exact current localhost helper impl: none. tweetGPT still direct-posts OpenAI from the MV3 SW.
- Bridge seam already right: content script stays dumb; only `src/background/chat_gpt_client/chat_gpt_client.ts` is the outbound network seam.
- If helper added, SW `fetch()` is the right caller; add `http://127.0.0.1/*` host permission. Do not move helper fetch into content script.
- Bridge contract to add: `GET /health`; `POST /v1/generate-tweet` body = `TweetProps`; return raw tweet text for v1. SSE optional later; if used, return `text/event-stream` and parse via `fetch()+ReadableStream`, not `EventSource`, so `Authorization` can stay attached.
- Security: `Authorization: Bearer <pairing-secret>` + strict `Origin: chrome-extension://<id>` / OPTIONS allowlist + no wildcard CORS. Current `externally_connectable` + no sender validation is the big abuse surface; token only protects the loopback helper, not twitter.com page scripts using the extension as proxy.
- UX: reuse current settings-page bootstrap + failure badge. `onInstalled` already opens settings; `getToken()` already reopens settings when missing. Add helper health check/status there; mirror opencode’s localhost print + browser-open pattern. Port discovery still unresolved; need fixed port or discovery/lockfile before health ping works.

## Start Here
`src/background/chat_gpt_client/chat_gpt_client.ts` — only outbound request + missing-token fallback; swap OpenAI POST for localhost helper client first, then `manifest.json`/`src/settings/settings_screen.tsx`.
