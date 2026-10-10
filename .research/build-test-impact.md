# Code Context

## Files Retrieved
1. `package.json` (lines 8-29) - current build/package scripts; no test/typecheck scripts; deps are browser-safe today.
2. `webpack.config.js` (lines 3-27) - 3 extension entrypoints, webpack emits only `lib/*.js`; no `target: node` / no Node polyfills.
3. `tsconfig.json` (lines 2-13) - one TS config for `src/**/*`; `types` mixes `node` + `chrome`.
4. `manifest.json` (lines 6-33) - MV3 permissions, host permissions, background service worker, web-accessible resources.
5. `src/background/background.ts` (lines 1-53) + `src/background/chat_gpt_client/chat_gpt_client.ts` (lines 1-95) - control plane + OpenAI fetch/token storage.
6. `src/background/chat_gpt_client/locales.ts` (lines 1-224) - shared locale table/default locale used by settings + inject.
7. `src/inject/inject.ts` (lines 1-47) + `src/inject/utils/generate_text.ts` (lines 1-7) - content-script -> background message bridge.
8. `src/inject/dom/add_gpt_button.ts` (lines 1-137), `create_observer.ts` (1-31), `find_closest_input.ts` (1-15), `set_input_text.ts` (1-19) - DOM/UI helpers; good smoke/unit targets.
9. `src/settings/settings.tsx` (lines 1-9) + `src/settings/settings_screen.tsx` (lines 1-97) + `src/settings/settings_screen.styled.ts` (1-39) + `src/settings/components/*.tsx` - settings UI + storage keys.
10. `assets/settings.html` (lines 1-12) + `css/inject.css` (lines 1-69) - static runtime assets outside webpack.
11. `README.MD` (lines 15-22, 25-36) - current manual install/use baseline.

## Key Code
- `webpack.config.js:5-24`
  ```js
  entry: { inject: "./src/inject/inject.ts", background: "./src/background/background.ts", settings: "./src/settings/settings.tsx" }
  output: { path: path.resolve(__dirname, './lib'), filename: "[name].js" }
  ```
- `tsconfig.json:2-13`: one config only, `include: ["src/**/*"]`; any helper outside `src` needs a second TS config.
- `manifest.json:6-33`: only `twitter.com` + `api.openai.com` are allowed today; SW is `lib/background.js`.
- `background.ts:3-53`: registers `lib/inject.js` + `css/inject.css`, then handles `generate_tweet` and signature append.
- `chat_gpt_client.ts:12-95`: direct `fetch("https://api.openai.com/v1/chat/completions")`, token read/write from `chrome.storage.local`.
- `generate_text.ts:3-6`: content script only sends `{type:'generate_tweet', props}` and waits for background response.
- `settings.html:10-11`: hardwired to `<script src="../lib/settings.js"></script>`; packaging path matters.

## Architecture
- Current extension already has a clean browser split:
  - settings page stores prefs/token in `chrome.storage.local`
  - content script finds Twitter compose UI and injects the GPT button
  - background service worker owns the network call and returns plain text
- If migrating to a local helper, keep `src/**` browser-only. Put Node/process code in a separate helper package/process (`helper/`, `native-host/`, etc) with its own `package.json` + Node `tsconfig`.
- Shared DTOs/protocols should move to a browser-safe shared module (`src/shared/` or `shared/`), because today `generate_text.ts` imports `TweetProps` from a background subdir and `settings_screen.tsx` imports locales from the background tree.
- Manifest impact: today only Twitter + OpenAI are authorized; loopback HTTP needs new host permissions, native messaging needs `"nativeMessaging"`.

## What cannot be bundled
- Node-only code/libs: `fs`, `path`, `child_process`, `net`, `tls`, `os`, CLI wrappers, native addons, anything that expects a real filesystem or spawned process.
- Any SDK that depends on Node runtime or local process control should stay in the helper only; extension bundle should stay on browser APIs (`fetch`, `chrome.*`, DOM, React).
- Static assets are fine but are not webpack-managed here; if package layout changes, copy `assets/`, `css/`, `icons/` into the shipped extension.

## Scripts to add
- Current scripts (`package.json:8-12`) are only `build`, `watch`, `clean`, `package`.
- Add at least:
  - `typecheck`: `tsc -p tsconfig.json --noEmit` (+ helper tsconfig)
  - `build:ext`: webpack extension bundle
  - `build:helper`: Node/helper compile
  - `test:unit`: pure helpers/protocol tests
  - `test:smoke`: unpacked-extension smoke in Chromium/Playwright
  - `package:ext`: stage runtime files only, then zip
- Current `package` zips `*`; once helper/tests exist at repo root it will ship them too, so switch to a staged dist dir.

## Type declarations
- There are no custom `.d.ts` files now.
- Best split:
  - `src/shared/protocol.ts` for request/response shapes
  - `src/types/*.d.ts` only for ambient browser glue if needed
  - helper gets `tsconfig.node.json` with `types: ["node"]`
  - extension keeps `types: ["chrome"]`
- This keeps browser vs Node boundary visible; current single config masks that boundary.

## Smoke tests / CI / manual
- CI sequence:
  1. `yarn install --frozen-lockfile`
  2. `yarn build`
  3. `yarn typecheck`
  4. `yarn test:unit`
  5. `yarn test:smoke`
- Do not hit live OpenAI/Twitter in CI; mock fetch/helper responses.
- Add an artifact assertion: zip contains only manifest, `lib/*.js`, `assets/`, `css/`, `icons/`.
- Manual smoke baseline from `README.MD:15-22`:
  - load unpacked extension
  - confirm settings page opens
  - save token/prefs and reload
  - open Twitter composer, click GPT button, verify text insertion
  - reply flow + error state reset
- For helper migration, also test helper-down / helper-up paths.

## Start Here
- `webpack.config.js` then `manifest.json` - they define the bundle boundary Chrome loads and what can/can’t be shipped with it.
