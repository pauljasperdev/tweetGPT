# Code Context

## Files Retrieved
1. `packages/opencode/src/plugin/codex.ts` (lines 1-17, 248-321, 360-615) - built-in ChatGPT OAuth/Codex auth plugin; local OAuth callback server; model filter; token refresh; request rewrite to Codex endpoint.
2. `packages/opencode/src/plugin/index.ts` (lines 13-20, 57-65) - proves CodexAuthPlugin is built-in, not external-only.
3. `packages/opencode/src/plugin/shared.ts` (lines 9-10) - old `opencode-openai-codex-auth` package marked deprecated.
4. `packages/opencode/src/cli/cmd/providers.ts` (lines 24-30, 32-120, 225-390, 427-470) - `opencode auth login/list/logout`; method selection; openai hint; plugin-auth flow; credential persistence.
5. `packages/opencode/src/auth/index.ts` (lines 10-80) - auth file path, schema, `OPENCODE_AUTH_CONTENT` override, 0600 writes.
6. `packages/opencode/src/provider/provider.ts` (lines 1279-1309) - runtime merges file/env API keys and plugin auth loader for oauth.
7. `packages/opencode/src/server/middleware.ts` (lines 41-51) and `packages/opencode/src/server/cors.ts` (lines 1-14) - Basic Auth, preflight, legacy `auth_token`, CORS allowlist.
8. `packages/opencode/src/server/routes/instance/middleware.ts` (lines 7-31) - per-request `directory` via query/header.
9. `packages/opencode/src/server/routes/instance/session.ts` (lines 861-942) and `packages/opencode/src/session/prompt.ts` (lines 1370-1387, 1806-1828) - session prompt API, noReply, format, prompt_async.
10. `packages/opencode/src/cli/cmd/serve.ts` (lines 7-23), `packages/opencode/src/cli/cmd/web.ts` (lines 32-84), `packages/opencode/src/cli/cmd/run.ts` (lines 206-214, 377-405, 625-675) - serve/web/run usage and attach/in-process backend paths.
11. `packages/sdk/js/src/client.ts` (lines 16-54) - `@opencode-ai/sdk` client; `directory` option; header/query rewrite.
12. `packages/sdk/openapi.json` (lines 5109-5320) - SDK-exposed `provider.auth`, `provider.oauth.authorize`, `provider.oauth.callback`.
13. `packages/web/src/content/docs/cli.mdx` (lines 141-147, 352-380), `packages/web/src/content/docs/server.mdx` (lines 47-80, 160-180), `packages/web/src/content/docs/web.mdx` (lines 73-89, 117-123), `packages/web/src/content/docs/config.mdx` (lines 293-309), `packages/web/src/content/docs/sdk.mdx` (lines 72-90, 122-159, 311-320, 428-443), `packages/web/src/content/docs/providers.mdx` (lines 18-21, 1519-1544, 2067-2144), `packages/web/src/content/docs/models.mdx` (lines 38-63), `packages/web/src/content/docs/zen.mdx` (lines 69-80, 160-170) - docs corroboration for CLI, server, SDK, providers, and spark model availability.
14. `packages/opencode/src/session/llm.ts` (lines 100-148) - OpenAI OAuth sessions special-case prompt packing (`instructions`, no system messages).

## Key Code

### 1) Auth storage = file + env override + typed union
`packages/opencode/src/auth/index.ts:10-80`
- File path is `path.join(Global.Path.data, "auth.json")`.
- `Auth.Info` is a union of:
  - `oauth` = `{ refresh, access, expires, accountId?, enterpriseUrl? }`
  - `api` = `{ key, metadata? }`
  - `wellknown` = `{ key, token }`
- `all()` first checks `OPENCODE_AUTH_CONTENT` (JSON string override), then reads `auth.json`.
- `set()` / `remove()` write with mode `0600`.

### 2) ChatGPT OAuth Codex provider is built in
`packages/opencode/src/plugin/index.ts:57-65`, `packages/opencode/src/plugin/codex.ts:360-615`
- `CodexAuthPlugin` is an internal plugin, not an optional add-on.
- `provider.id = "openai"`.
- OAuth methods:
  - `ChatGPT Pro/Plus (browser)`
  - `ChatGPT Pro/Plus (headless)`
  - `Manually enter API Key`
- Browser flow starts a local callback server on `localhost:1455`.
- Headless flow uses OpenAI device auth.
- OAuth success stores `{ type: "oauth", refresh, access, expires, accountId? }`.
- API-key success stores `{ type: "api", key }`.
- Runtime auth loader returns `apiKey: OAUTH_DUMMY_KEY` and a custom `fetch` that:
  - strips the dummy auth header,
  - refreshes expired access tokens,
  - adds `ChatGPT-Account-Id` when available,
  - rewrites OpenAI `/v1/responses` and `/chat/completions` requests to `https://chatgpt.com/backend-api/codex/responses`.

### 3) Spark: present in general catalog, excluded from OAuth Codex path
`packages/web/src/content/docs/zen.mdx:73-80, 160-170`, `packages/opencode/src/plugin/codex.ts:17, 364-373`
- General OpenCode Zen catalog lists `gpt-5.3-codex-spark`.
- The OAuth Codex plugin only allows:
  - `gpt-5.5`
  - `gpt-5.2`
  - `gpt-5.3-codex`
  - `gpt-5.4`
  - `gpt-5.4-mini`
  - plus any `gpt-x.y` model where `x.y > 5.4`
- `gpt-5.3-codex-spark` is not in that allowlist, so it is filtered out in ChatGPT OAuth mode.

### 4) `opencode auth login` / `/connect` is the credential UX
`packages/opencode/src/cli/cmd/providers.ts:225-390, 427-470`
- `opencode auth` = provider credential manager.
- `openai` is explicitly hinted as `ChatGPT Plus/Pro or API key`.
- If a provider has auth hooks, the CLI uses `handlePluginAuth` instead of raw API-key prompt.
- `--method` can pin the auth flow; otherwise the user is prompted.
- `opencode auth list` shows stored credentials and active env credentials.
- Docs use `/connect` in the TUI; CLI equivalent is `opencode auth login`.

### 5) Server = headless backend, per-request directory, auth + CORS
`packages/opencode/src/cli/cmd/serve.ts:7-23`, `packages/opencode/src/server/routes/instance/middleware.ts:7-31`, `packages/opencode/src/server/middleware.ts:41-51`, `packages/opencode/src/server/cors.ts:1-14`, `packages/opencode/src/cli/cmd/web.ts:32-84`
- `serve` starts a headless API server.
- `web` starts the same server plus browser UI.
- `directory` is resolved from query string or `x-opencode-directory` header.
- Basic Auth is optional; if `OPENCODE_SERVER_PASSWORD` is unset, server runs unauthenticated with a warning.
- Username defaults to `opencode` unless `OPENCODE_SERVER_USERNAME` is set.
- `OPTIONS` preflight bypasses auth.
- CORS allowlist is exact-match except for localhost / 127.0.0.1 / `oc://renderer` / Tauri / `opencode.ai` origins.
- `--cors` can be repeated; config file supports the same server block.

### 6) Session prompt API = `POST /session/:id/message`
`packages/opencode/src/server/routes/instance/session.ts:861-942`, `packages/opencode/src/session/prompt.ts:1370-1387, 1806-1828`
- SDK method is `client.session.prompt(...)`.
- Required body field: `parts`.
- Optional fields:
  - `messageID`
  - `model` (`{ providerID, modelID }`)
  - `agent`
  - `noReply`
  - `tools` (deprecated)
  - `format`
  - `system`
  - `variant`
- `noReply: true` returns only the user message (context injection, no AI reply).
- `format` supports JSON-schema structured output.
- `prompt_async` exists for fire-and-forget (204), same request body.
- Docs page has one stale phrase: it says `outputFormat`, but the real schema/implementation uses `format`.

### 7) SDK client can sit in front of a helper backend
`packages/sdk/js/src/client.ts:16-54`, `packages/web/src/content/docs/sdk.mdx:72-90, 311-320, 428-443`, `packages/sdk/openapi.json:5109-5320`
- `createOpencodeClient({ baseUrl: "http://localhost:4096" })` is the documented entrypoint.
- The JS client also accepts `directory` and auto injects `x-opencode-directory` / query params.
- SDK docs cover `client.session.prompt` and `client.auth.set`.
- Generated OpenAPI also exposes `client.provider.auth()`, `client.provider.oauth.authorize(...)`, and `client.provider.oauth.callback(...)`.

## Architecture

### A) The "tweetGPT backend" shape
Yes, opencode can act as a local helper backend.

- `opencode serve` = long-lived headless HTTP backend.
- `opencode web` = same backend + browser UI.
- `opencode run` = one-off CLI; without `--attach` it spins up an in-process server for that invocation; with `--attach` it uses an existing backend.
- `@opencode-ai/sdk` is the thin client layer that talks to that server.
- The server is multi-client and multi-project because each request carries `directory` (query/header), so one backend can serve many checkouts / worktrees.

### B) ChatGPT OAuth Codex flow
- The built-in `openai` plugin handles the ChatGPT OAuth/Codex path.
- `opencode auth login` or the TUI `/connect` UI surfaces its methods.
- The OAuth result is stored in the auth file as `type: oauth`.
- At runtime, the plugin swaps the OpenAI API key for a dummy value and supplies a custom fetch that talks to the Codex backend.
- `session/llm.ts` special-cases `openai` + oauth so system prompts become `instructions` instead of normal system messages. That matches Codex behavior.

### C) Model support reality
- General docs show spark in the Zen catalog.
- OAuth Codex mode is deliberately narrower.
- So:
  - **If you need ChatGPT subscription auth**: use `openai` OAuth; spark is **not** in the allowlist.
  - **If you need spark**: use OpenCode Zen / API-key path instead of the OAuth Codex path.

### D) Basic Auth / CORS for a custom frontend
If tweetGPT is a custom browser UI:

- keep the backend on `127.0.0.1` if possible;
- otherwise set `OPENCODE_SERVER_PASSWORD` (and optional username);
- add tweetGPT’s exact origin via `--cors` or `server.cors` in config;
- if you need a LAN backend, consider `--hostname 0.0.0.0` plus mDNS or a fixed port.

### E) Practical invocation pattern
Best local route for tweetGPT:

```bash
# backend
OPENCODE_SERVER_PASSWORD=secret opencode serve --port 4096 --cors http://localhost:3000

# auth once, in CLI or TUI
opencode auth login --provider openai
```

```ts
import { createOpencodeClient } from "@opencode-ai/sdk"

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  directory: "/path/to/repo",
})

const session = await client.session.create({ title: "tweetGPT" })
await client.session.prompt({
  path: { id: session.data!.id },
  body: {
    parts: [{ type: "text", text: "Draft a tweet from these notes..." }],
  },
})
```

If you want to drive the OAuth flow from code instead of the CLI, use the SDK provider auth endpoints:

```ts
const methods = await client.provider.auth()
const auth = await client.provider.oauth.authorize({
  path: { providerID: "openai" },
  body: { method: 0 },
})
```

## Risks / mismatches
- Docs say OpenAI models should be available after auth, but code narrows the OAuth Codex model list; spark is the obvious mismatch.
- `sdk.mdx` says `outputFormat`, but source uses `format`.
- The old `opencode-openai-codex-auth` package is deprecated; use the built-in plugin.
- If you expose the server beyond loopback, Basic Auth + explicit CORS are mandatory.

## Start Here
1. `packages/opencode/src/plugin/codex.ts` - exact OAuth/Codex behavior, model filter, request rewrite.
2. `packages/sdk/js/src/client.ts` - how tweetGPT should point at the backend and set `directory`.
3. `packages/opencode/src/server/middleware.ts` + `packages/opencode/src/server/cors.ts` - security envelope for a custom frontend.
