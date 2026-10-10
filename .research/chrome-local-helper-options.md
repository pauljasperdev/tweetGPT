# Research: Chrome MV3 local helper options for tweetGPT

## Summary
For tweetGPT local Codex/Pi/OpenCode helper, best default: content script -> extension service worker -> localhost/127.0.0.1 HTTP fetch; add WebSocket only if streaming/long-running sessions needed. Native Messaging is more locked down/no open port and good for one-shot CLI bridge, but requires separate OS host registration/installer, making public install harder.

## Findings
1. **MV3 architecture: keep local calls in the service worker, not content scripts** — Chrome says content-script fetches run under the injected page origin and remain same-origin/CORS-limited; extension service workers/pages can make cross-origin `fetch()` if host permissions are declared. tweetGPT already has this shape: injected Twitter/X UI sends `generate_tweet` to background; replace `ChatGPTClient.fetch(openai)` with `LocalHelperClient.fetch(127.0.0.1)` and keep Twitter DOM code unprivileged. [Chrome network requests](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests)
2. **Localhost fetch manifest is small** — add host permissions like `"http://127.0.0.1/*"` and/or `"http://localhost/*"`; Chrome documents `http://localhost/*` as matching any localhost port and `http://127.0.0.1/*` as loopback IP matching. Host-permission paths are required but ignored; use `/*`. Avoid `http://*:*/*` unless dev-only; it matches localhost/IP/any port and is broad. [Chrome match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns)
3. **Content-script localhost CORS is a trap** — if tweetGPT content script directly `fetch('http://localhost:port')` from twitter.com/x.com, the local server must send CORS for the page origin and Chrome Local Network Access may prompt/block site-origin local requests. Service-worker fetch with host permissions avoids page-origin CORS; still bind helper to `127.0.0.1` and validate `Origin: chrome-extension://<id>` because webpages/malware can still try CSRF-like localhost writes. [Chrome network requests](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests), [Chrome LNA blog](https://developer.chrome.com/blog/local-network-access)
4. **WebSocket from MV3 service worker is viable for streaming** — Chrome 116+ supports WebSockets in extension service workers; to keep worker alive, exchange messages within the 30s idle window, e.g. ping every 20s. Use this for streaming Codex/OpenCode output; otherwise simpler POST fetch is easier. If custom extension CSP adds `connect-src`/`default-src`, allow the helper host there; default CSP does not set connect-src. [Chrome WebSockets in SW](https://developer.chrome.com/docs/extensions/how-to/web-platform/websockets), [Chrome network CSP note](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests), [Chrome CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy)
5. **Local Network Access is mainly a website restriction; extension edge exists** — Chrome 141/142 LNA restricts public websites making fetch/subresource/subframe requests to local/loopback behind permission; WebSockets were not in the first milestone but planned. Chromium Extensions thread shows a Chrome 142 background-service fetch to localhost with host permissions hitting `Permission was denied ... address space`; Chrome team called it a bug fixed in >=144. Treat current Chrome as: service-worker + exact host_permissions should work, but test on stable/beta/canary. [blink-dev intent](https://mail-archive.com/blink-dev%40chromium.org/msg14529.html), [Chromium Extensions thread](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pUDh8RiTjJk)
6. **Native Messaging manifest/install friction is real** — extension needs `"permissions": ["nativeMessaging"]`; content scripts cannot call native messaging, only extension pages/service worker, so still relay via background. Native host must be separately installed/registered: Windows registry key; macOS/Linux JSON in browser-specific NativeMessagingHosts dir. Host manifest pins allowed extension IDs; `allowed_origins` cannot wildcard. [Chrome Native Messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging)
7. **Native Messaging security profile is stronger by default** — no listening TCP port; Chrome launches host as a separate process over stdio; host sees caller origin as first arg; `connectNative()` keeps one process/port alive, `sendNativeMessage()` starts a process per message. Message limits: host->Chrome 1 MB, Chrome->host 64 MiB. Good for local CLI bridge (`codex`, `opencode`) and short generated tweets; less good for casual install. [Chrome Native Messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging)
8. **Chrome Web Store implications: keep code/data boundary clear** — MV3 store policy requires extension functionality discernible from submitted code; remote/external resources may provide data, not browser-executed logic; RHC includes JS/WASM executed by browser, but not JSON/data. A local helper returning generated text is data; do not fetch/eval JS, prompts-as-code, or command programs from helper. Broad host permissions trigger warnings/review friction; minimize to Twitter/X + exact local helper origins and justify local companion in listing/privacy. [CWS MV3 requirements](https://developers.chrome.com/docs/webstore/program-policies/mv3-requirements), [RHC guide](https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code), [Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)

## Option matrix

| Option | Manifest | Install friction | Security | CORS/LNA | CWS risk | Fit for tweetGPT helper |
|---|---|---:|---|---|---|---|
| **SW -> localhost fetch** | `host_permissions`: `http://127.0.0.1/*`, maybe `http://localhost/*` | Medium: user runs daemon/brew service | Open loopback port; require token + Origin check + bind 127.0.0.1 | Best via SW; content script direct bad; LNA site restriction mostly avoided | Low/medium: local host permission + disclose | **Recommended default** for local Codex/OpenCode HTTP helper |
| **SW -> localhost WebSocket** | same host perms for HTTP; CSP `connect-src` if customized | Medium | Same as fetch + Origin check + heartbeat | Works in SW Chrome 116+; LNA WebSocket gating planned | Low/medium | Use for streaming tokens/progress |
| **Native Messaging** | `permissions`: `nativeMessaging` | High: per-OS host manifest/registry installer | No port; extension ID allowlist; stdio protocol | No CORS/LNA | Medium: native permission + companion app review explanation | Best for packaged companion/CLI one-shot bridge |
| **Content script -> localhost** | none/host perms do not bypass content CORS | Low code, high breakage | Page-origin exposed; CSRF/LNA issues | Bad: page CORS + LNA prompt/block | Medium | **Avoid** |
| **Direct LAN Pi HTTP** | exact `http://pi.local/*` or static IP | Medium/high | LAN MITM unless HTTPS/Tailscale/SSH tunnel | LNA policy evolving; direct HTTP fragile | Medium | Prefer SSH tunnel to localhost or HTTPS/Tailscale |

## Recommended implementation for tweetGPT

1. Keep current message path: `inject.ts` gathers tweet context -> `chrome.runtime.sendMessage({type:'generate_tweet', props})` -> background returns text.
2. Add `LocalHelperClient` in background only:
   - `POST http://127.0.0.1:31415/v1/generate-tweet`
   - headers: `Authorization: Bearer <random local token>`; `Content-Type: application/json`
   - body only structured data: `{locale,type,topic,replyTo}`; no arbitrary URL/command from content script.
3. Manifest minimal dev/public:
   ```json
   "host_permissions": [
     "https://twitter.com/", "https://x.com/",
     "http://127.0.0.1/*", "http://localhost/*"
   ]
   ```
   Consider `optional_host_permissions` for local helper if extension still supports OpenAI/cloud mode.
4. Helper server rules:
   - bind `127.0.0.1` only by default; random high port or fixed port with lockfile discovery.
   - require bearer token stored in native app config and extension storage/manual pairing.
   - check `Origin`/`Sec-Fetch-Site` where present; accept only `chrome-extension://<published-id>` and dev ID.
   - strict endpoint allowlist; no shell arg passthrough; spawn Codex/OpenCode with fixed command templates; redact API keys.
5. Streaming: start with non-streaming fetch. Add WebSocket/SSE later if Codex/OpenCode streaming UX needed; heartbeat every <=20s for WS in MV3 SW.
6. If target becomes Chrome Web Store + nontechnical users, build a native-messaging companion installer instead of asking users to run a daemon. It removes port/LNA issues but adds per-OS install/update and extension-ID pinning.

## Sources
- Kept: Chrome Native Messaging (https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) — primary API/install/protocol/permission evidence.
- Kept: Chrome Cross-origin network requests (https://developer.chrome.com/docs/extensions/develop/concepts/network-requests) — primary CORS + service-worker host-permission behavior.
- Kept: Chrome Match patterns (https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) — localhost/IP host permission syntax.
- Kept: Chrome WebSockets in service workers (https://developer.chrome.com/docs/extensions/how-to/web-platform/websockets) — MV3 SW WebSocket/lifetime behavior.
- Kept: Chrome CSP manifest docs (https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy) — default/minimum CSP and connect-src context.
- Kept: CWS MV3 requirements (https://developers.chrome.com/docs/webstore/program-policies/mv3-requirements) — external logic/RHC policy boundary.
- Kept: RHC guide (https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code) — confirms data/JSON not RHC, browser-executed external JS/WASM forbidden.
- Kept: Declare permissions (https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) — host permissions/warnings/optional permissions.
- Kept: LNA blog + blink-dev intent (https://developer.chrome.com/blog/local-network-access, https://mail-archive.com/blink-dev%40chromium.org/msg14529.html) — current local-network restrictions and WebSocket roadmap.
- Kept: Chromium Extensions LNA thread (https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pUDh8RiTjJk) — extension-specific Chrome 142 bug/fix signal; non-policy, use as caution.
- Dropped: SEO CORS/WebSocket blog posts — redundant vs Chrome docs.
- Dropped: StackOverflow localhost extension answers — useful anecdotes, not authoritative.
- Dropped: MDN Native Messaging — good cross-browser docs, but Chrome docs are primary here.

## Gaps
- Chrome extension + LNA behavior has sparse official extension docs; verify current stable with `fetch('http://127.0.0.1:<port>')` from MV3 service worker and host_permissions.
- Chrome Web Store review outcome for local AI companion depends on disclosure/privacy/reviewer judgment; pre-submit with exact permissions and no external browser-executed code.
- Need choose helper UX: dev-only daemon vs packaged native companion; decision drives Native Messaging vs localhost.