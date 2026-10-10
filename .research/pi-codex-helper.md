# Pi / Codex helper for tweetGPT

## Verdict

- **Browser-only auth path: no.** The pi-ai docs say OAuth login flows are **not supported in browser environments**; use the Node.js OAuth entry point instead.
- **Best minimal bridge:** a small Node 20 helper process, with the extension talking to it over localhost HTTP.
- **Best minimal code path:** `@mariozechner/pi-coding-agent` `AuthStorage` + `@mariozechner/pi-ai` `getModel`/`completeSimple`.
- **Lowest dependency path:** `@mariozechner/pi-ai` + `@mariozechner/pi-ai/oauth`, but then the helper must manage `auth.json` refresh/writeback itself.

## Current tweetGPT baseline

- tweetGPT currently stores a raw OpenAI API token in `chrome.storage.local`, then sends it directly to `https://api.openai.com/v1/chat/completions`.
- The extension manifest only allows `https://api.openai.com/` and `https://twitter.com/`; a localhost helper would need a manifest update.
- The current code path is a single async request/response, so the helper does **not** need streaming for the first pass.

## Exact minimal helper approach

### Recommended: `pi` SDK + `completeSimple`

Use one Node helper process that owns auth and generation:

```ts
import http from "node:http";
import { AuthStorage } from "@mariozechner/pi-coding-agent";
import { getModel, completeSimple } from "@mariozechner/pi-ai";

const auth = AuthStorage.create(); // default: ~/.pi/agent/auth.json
const model = getModel("openai-codex", "gpt-5.3-codex-spark");

http
  .createServer(async (req, res) => {
    if (req.method !== "POST" || req.url !== "/generate") {
      res.writeHead(404).end();
      return;
    }

    const body = await readJson(req);
    const apiKey = await auth.getApiKey("openai-codex");
    if (!apiKey) {
      res.writeHead(401).end(JSON.stringify({ error: "login required" }));
      return;
    }

    const context = {
      systemPrompt: [body.systemMessage, body.systemMessage2].join("\n"),
      messages: [
        {
          role: "user",
          content: body.userMessage,
          timestamp: Date.now(),
        },
      ],
    };

    const msg = await completeSimple(model, context, {
      apiKey,
      transport: "sse",
      // reasoning: "minimal" // optional; omit for the lightest path
      // maxTokens: 256 // optional; tweets do not need more
    });

    const tweet = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ tweet }));
  })
  .listen(31415, "127.0.0.1");
```

Why this is the best default:
- `AuthStorage` handles stored creds, refresh, and locked writes.
- `completeSimple` maps the reasoning options for you.
- tweetGPT needs one final string, so `completeSimple` is the smallest API surface.

### Lowest-dependency helper (`pi-ai` only)

If you do **not** want `pi-coding-agent`, use `@mariozechner/pi-ai/oauth`:

```ts
import { getModel, completeSimple } from "@mariozechner/pi-ai";
import { getOAuthApiKey } from "@mariozechner/pi-ai/oauth";

const auth = JSON.parse(readFileSync(authPath, "utf8"));
const result = await getOAuthApiKey("openai-codex", auth);
if (!result) throw new Error("Not logged in");

auth["openai-codex"] = { type: "oauth", ...result.newCredentials };
writeFileSync(authPath, JSON.stringify(auth, null, 2));

const model = getModel("openai-codex", "gpt-5.3-codex-spark");
const msg = await completeSimple(model, context, { apiKey: result.apiKey, transport: "sse" });
```

This is simpler dependency-wise, but you own:
- file path choice,
- file permissions,
- writeback on refresh,
- concurrency/races if multiple helper processes run.

## How auth is stored / refreshed

### What the OpenAI Codex OAuth flow returns

The provider returns OAuth creds with:
- `access`
- `refresh`
- `expires`
- `accountId` (extra field)

The login flow stores the refresh token and access token together; the account id is derived from the JWT and preserved in the returned credential object.

### Canonical storage path

The pi SDK defaults to `~/.pi/agent/auth.json`:

- `AuthStorage.create()` -> `~/.pi/agent/auth.json`
- directory permissions: `0700`
- file permissions: `0600`

### Refresh behavior

- `AuthStorage.getApiKey("openai-codex")` checks expiry.
- If expired, it refreshes with a file lock, writes the refreshed creds back, then returns the fresh access token.
- If refresh fails, it re-reads storage to see whether another process won.
- `getOAuthApiKey("openai-codex", authMap)` does the refresh too, but **does not persist**; caller must save `newCredentials`.

### Important storage rule

Do **not** strip unknown fields when persisting OAuth creds. Keep the full returned object. For Codex, that means `accountId` should survive round-trips.

## How to use `openai-codex` + `gpt-5.3-codex-spark`

Use the provider/model pair directly:

```ts
const model = getModel("openai-codex", "gpt-5.3-codex-spark");
```

Why this matters:
- `openai-codex` is the subscription-backed provider.
- Per pi docs, this is the ChatGPT Plus/Pro subscription path, not the API-key-backed OpenAI path.
- The same model id also exists under other providers; provider string is what switches you away from API-key billing.
- The model is **text-only** in the built-in catalog.
- The model is cataloged with a 128k context window and zero-cost metadata in pi, which makes it a good fit for short tweet generation.

### Prompt shape for tweetGPT

tweetGPT currently uses two system prompts plus one user prompt. In pi, merge the system prompts into `Context.systemPrompt`:

```ts
const context = {
  systemPrompt: [
    `You are a ghostwriter for users tweets. Use locale "${locale}". Return only one tweet. Keep it short.`,
    "Exclude everything after the tweet. Exclude hashtags. Exclude emojis. Don't apologize. Don't provide translation. Don't provide notes. Exclude calls to action.",
  ].join("\n"),
  messages: [
    {
      role: "user",
      content: `Write a ${type} tweet${topic ? ` about ${topic}` : ""}${replyTo ? ` in reply to a tweet \"${replyTo}\"` : ""}`,
      timestamp: Date.now(),
    },
  ],
};
```

That matches how the Codex provider uses `instructions`.

## Fastest stateless options

### Best stateless default

- `completeSimple(...)`
- `transport: "sse"`
- no `sessionId`
- no tools
- no images
- low `maxTokens` (tweets do not need much)
- keep `store:false` (the provider already does this)

This is the lightest, least stateful path for one-off tweet generation.

### Faster only if you accept state

If you later want prompt reuse across a composition session:

- set a stable `sessionId`
- use `transport: "websocket-cached"` or `"auto"`
- accept that the WebSocket session is reused and expires after ~5 minutes of inactivity

That is better for multi-turn drafting, but it is **not** stateless.

## Pitfalls

- **Browser OAuth unsupported:** the browser extension cannot run `loginOpenAICodex`; helper must be Node.
- **Wrong endpoint risk:** do not keep using `api.openai.com/v1/chat/completions` with the Codex token. The Codex provider targets `https://chatgpt.com/backend-api/codex/responses`.
- **No env-var shortcut:** `openai-codex` is not in the normal env-key map. There is no `OPENAI_API_KEY` equivalent for this path.
- **Auth format drift:** preserve the full OAuth object. If you manually write `auth.json`, keep `access`, `refresh`, `expires`, and extra fields like `accountId`.
- **Model/version drift:** `gpt-5.3-codex-spark` is in the current generated model catalog, but older pi-ai releases may not have it. Pin/update pi-ai.
- **Usage limits still exist:** the provider turns quota/rate-limit failures into friendly ChatGPT usage-limit errors. Do not retry them blindly.
- **`AuthStorage` vs external login:** if another process changes `auth.json`, a long-lived `AuthStorage` instance may need `reload()` or a restart.
- **Extension bridge permissions:** localhost helper calls need manifest permission; current manifest only whitelists OpenAI and Twitter.

## Files retrieved

1. `src/background/chat_gpt_client/chat_gpt_client.ts` (lines 1-59) - current direct OpenAI fetch; swap point.
2. `src/background/background.ts` (lines 1-44) - message flow into `ChatGPTClient.generateTweet`.
3. `src/settings/settings_screen.tsx` (lines 1-80) - browser token storage/UI that should be removed or repurposed.
4. `manifest.json` (lines 1-16) - current host permissions; no localhost helper permission yet.
5. `.repos/pi-mono/packages/ai/README.md` (lines 1000-1017, 1134-1203, 1212-1218) - browser OAuth limitation, programmatic OAuth, and Codex transport/session notes.
6. `.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts` (lines 24-27, 92-134, 202-271, 283-451) - Node-only OpenAI Codex login, refresh, and provider id.
7. `.repos/pi-mono/packages/ai/src/utils/oauth/index.ts` (lines 21-23, 127-145) - `loginOpenAICodex` and `getOAuthApiKey` export / refresh helper.
8. `.repos/pi-mono/packages/ai/src/utils/oauth/types.ts` (lines 3-18) - OAuth credential shape.
9. `.repos/pi-mono/packages/ai/src/env-api-keys.ts` (lines 90-165) - env var map; no `openai-codex` env shortcut.
10. `.repos/pi-mono/packages/ai/src/stream.ts` (lines 34-55) - `complete` / `completeSimple` wrapper surface.
11. `.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts` (lines 44-49, 120-170, 324-333, 404-410, 993-1000, 1058-1074, 1085-1119, 1128-1138) - Codex request shape, headers, session caching, and usage-limit handling.
12. `.repos/pi-mono/packages/ai/src/models.generated.ts` (lines 7423-7546) - `openai-codex` model catalog, including `gpt-5.3-codex-spark`.
13. `.repos/pi-mono/packages/ai/package.json` (lines 33-47) - export map for `./openai-codex-responses` and `./oauth`.
14. `.repos/pi-mono/packages/coding-agent/src/core/auth-storage.ts` (lines 53-84, 202-203, 400-505) - shared auth.json path, file locking, and auto-refresh behavior.
15. `.repos/pi-mono/packages/coding-agent/docs/providers.md` (lines 1-23, 42-83) - subscription auth overview and auth.json semantics.
16. `.repos/pi-mono/packages/coding-agent/docs/sdk.md` (lines 412-436) - AuthStorage resolution order and default auth path.

## Start here

`src/background/chat_gpt_client/chat_gpt_client.ts`.

Why:
- it is the current direct API call site,
- it shows the exact prompt shape to preserve,
- it is the narrowest place to swap in a localhost helper or SDK bridge.
