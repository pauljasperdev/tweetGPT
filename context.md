# Code Context

## Files Retrieved
1. `.repos/pi-mono/packages/ai/package.json` (lines 1-53) - export map; root `pi-ai`, `./oauth`, `./openai-codex-responses`.
2. `.repos/pi-mono/packages/ai/src/index.ts` (lines 1-43) - root AI exports; `stream*`, OAuth types, Codex websocket cleanup.
3. `.repos/pi-mono/packages/ai/src/stream.ts` (lines 1-59) - thinnest prompt→text API: `stream`, `complete`, `streamSimple`, `completeSimple`.
4. `.repos/pi-mono/packages/ai/src/models.generated.ts` (lines 7423-7601) - `openai-codex` model IDs incl `gpt-5.3-codex-spark`.
5. `.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts` (lines 63-68, 120-200, 320-346, 595-603, 993-1000, 1128-1138) - Codex transport/session/tool behavior.
6. `.repos/pi-mono/packages/ai/src/utils/oauth/index.ts` (lines 1-23, 29-152) - OAuth provider registry + `loginOpenAICodex`/`getOAuthApiKey`.
7. `.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts` (lines 1-5, 301-451) - ChatGPT Plus/Pro OAuth flow + provider id.
8. `.repos/pi-mono/packages/ai/src/utils/oauth/types.ts` (lines 3-51) - OAuth credential shape.
9. `.repos/pi-mono/packages/ai/src/env-api-keys.ts` (lines 101-156) - env key map; OAuth providers excluded from `getEnvApiKey`.
10. `.repos/pi-mono/packages/ai/README.md` (lines 1129-1214) - CLI login, auth.json storage, Codex `sessionId`/`transport` docs.
11. `.repos/pi-mono/packages/coding-agent/src/index.ts` (lines 1-43, 163-190, 284-298) - coding-agent exports; `createAgentSession`, `createAgentSessionRuntime`, `RpcClient`, `runRpcMode`.
12. `.repos/pi-mono/packages/coding-agent/src/core/sdk.ts` (lines 33-80, 193-413) - `createAgentSession` options + default wiring.
13. `.repos/pi-mono/packages/coding-agent/src/core/resource-loader.ts` (lines 116-151, 207-237, 395-457) - `noExtensions`/`noContextFiles`/etc.
14. `.repos/pi-mono/packages/coding-agent/src/core/session-manager.ts` (lines 682-752, 1269-1307) - session IDs + `inMemory()`.
15. `.repos/pi-mono/packages/coding-agent/src/core/auth-storage.ts` (lines 23-67, 206-214, 331-515) - `auth.json` storage and auth precedence.
16. `.repos/pi-mono/packages/coding-agent/src/migrations.ts` (lines 20-69) - legacy `oauth.json`→`auth.json` migration.
17. `.repos/pi-mono/packages/coding-agent/README.md` (lines 93-123, 523-569, 624-629) - default tools + disable flags + env overrides.
18. `.repos/pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts` (lines 1-48) - stdin/stdout JSONL RPC protocol.
19. `.repos/pi-mono/packages/coding-agent/src/modes/rpc/rpc-client.ts` (lines 26-39, 65-109, 162-200, 440-447) - client spawn args + prompt helpers.

## Key Code
- AI export surface:
  - `@mariozechner/pi-ai` root exposes `./oauth` + `./openai-codex-responses`.
  - `@mariozechner/pi-ai/oauth` exports `loginOpenAICodex`, `getOAuthApiKey`, `refreshOAuthToken`.
- Minimal text-only path:
  - `completeSimple(model, context, options)` / `streamSimple(...)`.
  - `Context` = `{ systemPrompt?, messages, tools? }`; omit `tools` for no tool use.
- Codex model IDs:
  - `openai-codex` section has `gpt-5.1`, `gpt-5.1-codex-max`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.2-codex`, `gpt-5.3-codex`, `gpt-5.3-codex-spark`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.5`.
  - `gpt-5.3-codex-spark` is text-only (`input:["text"]`) and catalog-cost 0.
- Codex request shape / session knobs:
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
  if (context.tools && context.tools.length > 0) body.tools = convertResponsesTools(context.tools, { strict: null });
  ```
  - `transport: "sse"` skips websocket attempt.
  - `closeOpenAICodexWebSocketSessions(sessionId?)` clears cached websocket sessions.
- OAuth / auth storage:
  ```ts
  export type OAuthCredentials = { refresh: string; access: string; expires: number; [key: string]: unknown };
  ```
  - `openai-codex` provider = `id: "openai-codex"`, name `ChatGPT Plus/Pro (Codex Subscription)`, `getApiKey()` returns `credentials.access`.
  - `AuthStorage` values = `{ type: "api_key", key }` or `{ type: "oauth", ...OAuthCredentials }`.
  - `FileAuthStorageBackend` default path = `~/.pi/agent/auth.json`, mkdir 0700, file 0600.
  - `pi-ai` CLI login writes `auth.json` in cwd; coding-agent runtime defaults to `~/.pi/agent/auth.json`.
  - `migrations.ts` migrates legacy `oauth.json` + `settings.json` apiKeys into `auth.json`.
- Agent wrapper knobs:
  ```ts
  const allowedToolNames = options.tools ?? (options.noTools === "all" ? [] : undefined);
  const initialActiveToolNames = options.tools ? [...options.tools] : options.noTools ? [] : defaultActiveToolNames;
  // Agent always gets sessionId from sessionManager.getSessionId()
  ```
  - `noTools: "all"` = no tools; `noTools: "builtin"` = built-ins off, extensions/custom still possible.
  - `SessionManager.inMemory()` stops persistence but still creates a sessionId.
  - `DefaultResourceLoader` has `noExtensions`, `noSkills`, `noPromptTemplates`, `noThemes`, `noContextFiles`.
- RPC wrapper:
  - `runRpcMode` = stdin JSON commands / stdout JSONL events+responses.
  - `RpcClient.start()` spawns `node ... --mode rpc`; `args` can append CLI flags; `promptAndWait()` waits for `agent_end`.

## Architecture
- Best direct tweet path: `loginOpenAICodex()` → store creds → `getOAuthApiKey("openai-codex", auth)` → `getModel("openai-codex", modelId)` → `completeSimple(...)`.
- Best agent path: `createAgentSession` wires `AuthStorage`, `ModelRegistry`, `SessionManager`, `DefaultResourceLoader`, then `Agent`.
- Safety/perf:
  - direct `pi-ai` path = no tools/extensions by construction; omit `sessionId` + use `transport:"sse"` for true stateless Codex calls.
  - agent path = disable with `noTools`, empty/override `resourceLoader`, `SessionManager.inMemory()`, and README CLI `--no-*` flags.
- Important caveat: `createAgentSession` always injects a sessionId from the session manager, so `SessionManager.inMemory()` is ephemeral, not stateless.
- RPC path is process-based, not in-process; good for embedding via CLI but heavier than direct `completeSimple`.

## Start Here
`.repos/pi-mono/packages/ai/src/stream.ts` - thinnest prompt→text API; then `packages/ai/src/utils/oauth/openai-codex.ts` for OAuth, or `packages/coding-agent/src/core/sdk.ts` if the agent/RPC wrapper is needed.