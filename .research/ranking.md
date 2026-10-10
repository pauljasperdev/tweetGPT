# Ranking: personal local-only tweetGPT fast generation

## Recommendation

**Pick: Chrome extension service worker -> `127.0.0.1` HTTP helper -> `pi-ai` direct `completeSimple()` using OpenAI Codex OAuth.**

Why: tweetGPT needs one tiny text completion, not a coding agent. `pi-ai` direct is the thinnest Node path already found: `loginOpenAICodex()` / stored OAuth creds -> `getOAuthApiKey("openai-codex")` -> `completeSimple(...)`. Run it stateless: no tools, no agent session, no workspace, no shell, no file context, `transport: "sse"`, low verbosity, tight timeout. For a personal local-only Chrome extension, localhost HTTP is the fastest bridge: one daemon, one POST, no per-request process spawn, easy retries, easy streaming later.

## Ruthless ranking

| Rank | Route | Verdict |
|---:|---|---|
| **1** | **localhost HTTP helper + Pi direct `pi-ai`** | **Best. Fastest, least moving parts, least agent baggage.** Personal-only makes daemon/port acceptable if bound to `127.0.0.1` with bearer token. |
| **2** | **Native Messaging host + Pi direct `pi-ai`** | Best security boundary; no listening port. Slower UX/dev loop and annoying host manifest/install. Choose if you hate localhost exposure more than installer friction. |
| **3** | **Pi CLI/RPC** | Good fallback when you want process isolation and Pi's agent/runtime/auth wrapper. Still heavier than direct; disable tools/extensions/context aggressively. Not ideal for sub-second tweet gen. |
| **4** | **Codex SDK** | Official-feeling and convenient, but it wraps/spawns Codex CLI JSONL and is a coding-agent abstraction. Useful if already signed into Codex CLI and want structured output/resume. Overkill for one tweet. |
| **5** | **OpenCode server** | Only choose if OpenCode is already always running and you want provider-agnostic local control. It is a broad agent server/session API, not a tiny generation endpoint. More attack surface, more state, more latency. |
| **6** | **Browser/native direct-to-provider without helper** | Bad fit even if technically possible. Browser should not own subscription OAuth/refresh tokens; extension CSP/CORS/auth edge cases become the product. |

## When to choose alternatives

- **Native Messaging over localhost HTTP**: public-ish packaging, no open port, strict extension-ID allowlist, no CORS/LNA ambiguity. Accept host registration + per-OS installer pain.
- **Pi CLI/RPC over Pi direct**: want a stable process boundary, want to reuse existing Pi agent CLI auth/config, or do not want helper code linked to `pi-ai` internals.
- **Codex SDK**: already committed to official Codex CLI semantics, need structured output/resumable threads, or want fewer assumptions about Pi's Codex provider surface.
- **OpenCode server**: already using OpenCode as your local AI hub, want multiple providers/models through one HTTP API, and speed/security are secondary.
- **WebSocket/SSE**: only after plain POST feels too slow or you need visible token streaming. Start non-streaming.

## Red flags / hard no's

- Binding helper/server to `0.0.0.0`, LAN, or mDNS for tweetGPT personal use.
- No bearer token / no Basic Auth / wildcard CORS / accepting arbitrary content-script commands.
- Storing Codex refresh tokens in `chrome.storage.local` or page/extension JS.
- Content script fetching localhost directly; keep network calls in background/service worker.
- Letting tweet prompts reach coding-agent tools, shell, filesystem, repo context, skills, plugins, MCP, or LSP.
- Reusing long sessions for unrelated tweets; prefer stateless one-shot calls.
- Logging tweet text, OAuth callback URLs, access tokens, refresh tokens, or raw provider errors.
- Shipping consumer ChatGPT/Codex subscription auth publicly without ToS/privacy review.

## Bottom line

For **personal local-only fast generation**, do not build around agents. Build a tiny local helper endpoint: `POST /generate-tweet` -> Pi direct one-shot completion -> return text. Use Native Messaging only if localhost security discomfort beats speed/simplicity.
