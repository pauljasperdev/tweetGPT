# Security / Privacy / Legal Feasibility: ChatGPT/Codex subscription auth in TweetGPT via local helper

## Verdict

- **Browser-only subscription auth: no-go.** The upstream pi-ai docs say OAuth login flows are **not supported in browser environments** and must use the Node.js OAuth entry point (`.repos/pi-mono/packages/ai/README.md:1001-1023`).
- **Browser extension + hardened local helper/native host: technically feasible**, but only if the helper owns auth, token refresh, and network calls. That is a major redesign from the current extension.
- **Production risk: high.** TweetGPT is archived/unsupported (`README.MD:3-20`), the current implementation is API-key based, and the browser helper path is not a documented upstream support surface.

## Current baseline in this repo

- The extension stores a plain OpenAI API key in `chrome.storage.local` and uses it directly in a bearer-token fetch to `api.openai.com` (`src/settings/settings_screen.tsx:19-21,40-80`; `src/background/chat_gpt_client/chat_gpt_client.ts:12-47,85-93`).
- Prompt data is collected from Twitter DOM, plus user-entered topic text, then sent to the model (`src/inject/inject.ts:7-37`; `src/inject/dom/add_gpt_button.ts:22-36,54-107`).
- The manifest currently allows only `twitter.com` and `api.openai.com`; there is no native messaging host, no localhost helper, and no ChatGPT auth surface (`manifest.json:6-16,24-31`).

## Key upstream facts to reuse as the security model

- OpenAI Codex OAuth flow is explicitly **Node.js only** and uses a local callback server + PKCE + refresh token flow (`.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts:1-6,24-29,92-172,175-280,301-451`).
- OAuth credential shape is `refresh`, `access`, `expires` (plus extra fields) (`.repos/pi-mono/packages/ai/src/utils/oauth/types.ts:3-51`).
- Subscription auth in pi stores tokens in `auth.json` and auto-refreshes them (`.repos/pi-mono/packages/coding-agent/docs/providers.md:14-23,79-118`).
- The reference auth storage code uses locked file writes and `0600` permissions (`.repos/pi-mono/packages/coding-agent/src/core/auth-storage.ts:52-67,379-516`).
- ChatGPT rate limits/usage limits are first-class in Codex docs and code (`.repos/codex/codex-rs/app-server/README.md:1611-1732`; `.repos/codex/codex-rs/protocol/src/error.rs:460-515`; `.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts:203-255,1054-1078`).

## Risk review

### 1) Credential exposure

**Risk**
- Current extension stores credentials in `chrome.storage.local`; that is not encrypted and is readable by any extension code with access to the store.
- Subscription auth adds **refresh tokens** and **access tokens**. A stolen refresh token is much worse than a one-off request token.

**Why it matters here**
- The current baseline already keeps the OpenAI secret inside the browser extension (`src/settings/settings_screen.tsx:19-21,40-80`).
- If a local helper is added and it also stores tokens in browser storage, logs, localStorage, or extension state, the browser becomes the credential vault.

**Mitigation**
- Keep the **refresh token only in the helper**, not in page JS and not in `chrome.storage.local`.
- Use OS secure storage / keychain or a locked file store with strict ACLs; mirror the `0600` pattern from pi-mono.
- Never log tokens, callback URLs with codes, or raw auth responses.

### 2) Localhost abuse

**Risk**
- The upstream OAuth callback server binds to `127.0.0.1` and a fixed port (`1455`) and waits for a `/auth/callback` hit (`.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts:202-280`).
- A browser extension helper that exposes a loopback HTTP endpoint can be abused by other local processes or by a web page if the browser can reach it.

**Why it matters here**
- Loopback auth is fine for a CLI; it is a bigger attack surface in a browser extension world.
- The current extension also has `externally_connectable` for twitter.com and an unfiltered background message handler (`manifest.json:15-16`; `src/background/background.ts:26-53`). That means sender validation must be explicit if any helper bridge is added.

**Mitigation**
- Prefer **native messaging** over a localhost HTTP listener.
- If localhost is unavoidable: random ephemeral port, localhost-only bind, one-time state/CSRF secret, POST-only, no wildcard CORS, no sensitive GET endpoints, and one-shot shutdown.
- Validate sender/origin in the background worker; do not trust `type` alone.

### 3) Native messaging host allowlist

**Risk**
- There is no native messaging host today. A helper that is “just a local service” is easier to abuse than a native host with an allowlist.

**Why it matters here**
- The current manifest only exposes storage/scripting/notifications and twitter/api.openai host permissions (`manifest.json:6-16,24-31`).
- A native messaging host manifest is the correct browser-side allowlist boundary, but it is not a security silver bullet by itself.

**Mitigation**
- Use Chrome native messaging with a host manifest that allowlists the extension ID.
- Keep the helper’s command surface tiny: `login`, `refresh`, `generate`, `logout` only.
- Reject unsolicited commands, oversized payloads, and any fields not in schema.

### 4) Prompt data leakage

**Risk**
- Prompts include tweet text, reply text, user-entered topic text, locale, and possibly other contextual data.
- Session-based caching / websocket reuse can retain more conversation context than a one-shot request.

**Why it matters here**
- Tweet text is read from the page DOM and sent onward (`src/inject/inject.ts:7-37`).
- Topic text is collected via `window.prompt` and persisted as `lastTopic` in `chrome.storage.local` (`src/inject/dom/add_gpt_button.ts:22-36`).
- Upstream Codex docs note session-based prompt caching and WebSocket reuse when `sessionId` is used (`.repos/pi-mono/packages/ai/README.md:1212-1214`).

**Mitigation**
- Treat prompts as user content: no telemetry, no crash dumps, no debug logging.
- Prefer **stateless one-shot requests** for tweet generation.
- If sessions are used, scope them per user/session/tab and clear them on logout.
- Minimize persisted state (`lastTopic` etc.) or move it out of the helper entirely.

### 5) ToS / production concerns

**Risk**
- The repo is archived and unsupported (`README.MD:3-4`).
- OpenAI/Codex docs in the mirrored repos describe ChatGPT plan sign-in for CLI/app-server use, while the pi-ai README explicitly says OAuth login flows are not supported in browser environments (`.repos/codex/README.md:47-51`; `.repos/pi-mono/packages/ai/README.md:1001-1023`).
- Using consumer ChatGPT/Codex subscription auth through a third-party browser extension is not a documented browser integration path.

**Why it matters here**
- This is the biggest legal/product risk, not just a technical one.
- A browser extension that brokers consumer account auth through a local helper may be fine in practice, or it may be outside current OpenAI/Chrome expectations. That needs explicit review.

**Mitigation**
- Get **product/legal approval** before shipping.
- Confirm the current OpenAI terms allow this exact use case (browser extension + helper + consumer subscription auth).
- Publish a clear privacy policy and user disclosure about what data leaves the device.
- If legal approval is unclear, use an API-key-backed backend instead.

### 6) Rate limits / usage limits

**Risk**
- Subscription auth is not unlimited. ChatGPT/Codex surfaces explicit usage limits and quota windows.
- A helper that retries blindly can amplify failures or burn through quota faster.

**Why it matters here**
- Codex app-server exposes ChatGPT rate limits and usage-limit states (`.repos/codex/codex-rs/app-server/README.md:1611-1732`).
- The error layer turns quota failures into friendly “hit your usage limit” messages and plan-specific guidance (`.repos/codex/codex-rs/protocol/src/error.rs:460-515`).
- The OpenAI Codex Responses transport retries transient errors, but stops retrying on usage-limit style failures (`.repos/pi-mono/packages/ai/src/providers/openai-codex-responses.ts:203-255,1054-1078`).

**Mitigation**
- Surface quota state in UI; don’t hide 429/usage-limit errors.
- Respect `Retry-After` / server-provided reset hints.
- Cap retries tightly; do not retry usage-limit errors.
- Throttle generation requests per tab/user to avoid accidental quota burn.

### 7) Token refresh / revocation

**Risk**
- Access tokens expire; refresh tokens are long-lived and must be rotated.
- Refresh failures can happen from expiry, revocation, reuse, or account mismatch.

**Why it matters here**
- `OAuthCredentials` contains `refresh`, `access`, and `expires` (`.repos/pi-mono/packages/ai/src/utils/oauth/types.ts:3-51`).
- The upstream auth code refreshes tokens and re-extracts `chatgpt_account_id` from the JWT (`.repos/pi-mono/packages/ai/src/utils/oauth/openai-codex.ts:283-287,411-451`).
- Reference storage code locks the auth file to prevent simultaneous refresh races (`.repos/pi-mono/packages/coding-agent/src/core/auth-storage.ts:397-516`).

**Mitigation**
- Refresh only inside the helper; never expose refresh tokens to page JS.
- Use single-flight refresh locking so two tabs do not race and reuse the same refresh token.
- On refresh failure, force re-login and revoke old tokens where possible.
- Bind credentials to the current account identity; detect account switches.

## Architecture recommendation if you proceed

- **Extension**: collect tweet/topic text, show UI, and call the helper.
- **Helper / native host**: own auth login, refresh, quota tracking, and the actual OpenAI/Codex request.
- **Browser**: never stores refresh tokens; never talks directly to ChatGPT auth endpoints.
- **Default mode**: stateless request/response, not a reusable session, unless there is a strong UX reason.

## Mitigation checklist

- [ ] Decide native messaging vs loopback HTTP; prefer native messaging.
- [ ] If loopback is used, bind localhost only, randomize the port, and add a one-time state/CSRF secret.
- [ ] Store refresh tokens only in helper-owned secure storage; never in `chrome.storage.local`.
- [ ] Remove or strictly validate `externally_connectable` / background sender paths.
- [ ] Redact prompts, tokens, callback URLs, and auth responses from logs/analytics/crash reports.
- [ ] Minimize prompt retention; clear sessions on logout; avoid cross-user session reuse.
- [ ] Implement single-flight token refresh with lock + rotation + revoke on logout.
- [ ] Add quota/usage-limit UI and cap retries.
- [ ] Get legal/product signoff before shipping consumer subscription auth in a browser extension.
- [ ] If signoff is not feasible, use an API key flow or server-side proxy instead.

## Open questions

- Is the intended deployment **internal only** or **public browser-store distribution**?
- Is OpenAI willing to support consumer ChatGPT/Codex auth in a third-party browser extension + local helper?
- Will the helper be **native messaging** or a **localhost HTTP daemon**?
- Are prompts allowed to be retained for debugging/analytics, or must they be zero-retention?
- Do we need cross-tab session reuse, or can every generation be stateless?
