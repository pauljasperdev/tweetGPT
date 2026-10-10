# Package Availability

## Verdict

- Top-level global install: `@mariozechner/pi-coding-agent@0.70.2` only.
- Nested under it: `@mariozechner/pi-ai@0.70.2`.
- Local source checkouts also exist for `@mariozechner/pi-ai@0.72.1`, `@mariozechner/pi-coding-agent@0.72.1`, `@openai/codex-sdk@0.0.0-dev`, `@opencode-ai/sdk@1.14.33`.
- Direct-import ready by package name: `@mariozechner/pi-ai`, `@mariozechner/pi-coding-agent` root, `@openai/codex-sdk`.
- Not direct-import ready as a normal npm dep: `@opencode-ai/sdk` (exports TS source; workspace/source-only layout).
- `@mariozechner/pi-coding-agent/hooks` is declared, but the current global install has no `dist/core/hooks/*`; treat that subpath as unavailable here.

| package | source version | global install | export shape | direct-import verdict |
|---|---:|---|---|---|
| `@mariozechner/pi-ai` | `0.72.1` | nested `0.70.2` under `@mariozechner/pi-coding-agent` | root + provider subpaths + `./oauth` + `./bedrock-provider` | yes, after install; subpaths are version-sensitive |
| `@mariozechner/pi-coding-agent` | `0.72.1` | top-level `0.70.2` | root + `./hooks` | root yes; `hooks` unavailable in current global tree |
| `@openai/codex-sdk` | `0.0.0-dev` | none | root only | yes if installed |
| `@opencode-ai/sdk` | `1.14.33` | none | source TS root/client/server/v2* | not a normal npm dep; workspace/source only |

## Files Retrieved

1. `.repos/pi-mono/packages/ai/package.json` (lines 2-52, 100-107) - package name/version, export map, engine floor.
2. `.repos/pi-mono/packages/ai/src/index.ts` (lines 1-43) - root export surface.
3. `.repos/pi-mono/packages/coding-agent/package.json` (lines 2-23, 40-99) - package name/version, export map, dependency set, engine floor.
4. `.repos/pi-mono/packages/coding-agent/src/index.ts` (lines 4-22, 51-190, 280-353) - public SDK/API exports incl `ExtensionAPI`, `createAgentSession`, `SessionManager`, `DynamicBorder`, `main`.
5. `.repos/pi-mono/packages/coding-agent/docs/packages.md` (lines 164-168) - peerDependencies rule for core pi packages.
6. `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/package.json` (lines 2-23) - installed global version 0.70.2 and `./hooks` export.
7. `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/node_modules/@mariozechner/pi-ai/package.json` (lines 2-29) - nested global pi-ai 0.70.2 and export drift.
8. `.repos/codex/sdk/typescript/package.json` (lines 2-31, 47-65, 18-20) - package name/version/export/engine.
9. `.repos/codex/sdk/typescript/src/index.ts` (lines 1-40) - `Codex`, `Thread`, events/types.
10. `.repos/opencode/packages/sdk/js/package.json` (lines 3-33) - source export map, version 1.14.33.
11. `.repos/opencode/package.json` (lines 101-107) and `.repos/opencode/bun.lock` (lines 532-540) - workspace dependency on sdk / workspace version.
12. `.repos/opencode/packages/sdk/js/src/index.ts` (lines 1-21), `client.ts` (lines 1-55), `server.ts` (lines 5-120) - public API.

## Key Code

- `@mariozechner/pi-ai` local package exports root + subpaths (`./anthropic`, `./azure-openai-responses`, `./google`, `./google-vertex`, `./mistral`, `./openai-codex-responses`, `./openai-completions`, `./openai-responses`, `./oauth`, `./bedrock-provider`). Root re-exports `Type`, `Static`, `TSchema`, and the AI helpers (`src/index.ts:1-43`, `package.json:8-52`).
- `@mariozechner/pi-coding-agent` root exports the runtime SDK (`createAgentSession`, `createReadTool`, `createWriteTool`, `SessionManager`, `SettingsManager`, `ExtensionAPI`, `DynamicBorder`, `main`, `runRpcMode`, etc.). Manifest also declares `./hooks`, but that path is missing in the current global install (`src/index.ts:4-22,51-190,280-353`, `package.json:14-23`).
- `@openai/codex-sdk` exports only the root entrypoint: `Codex`, `Thread`, `ThreadEvent`/`ThreadItem` types, `CodexOptions`, `ThreadOptions`, `TurnOptions` (`src/index.ts:1-40`, `package.json:24-31`).
- `@opencode-ai/sdk` exports source TS entrypoints only: `.` `./client` `./server` `./v2` `./v2/client` `./v2/gen/client` `./v2/server`; root adds `createOpencode` over `createOpencodeClient` + `createOpencodeServer` (`package.json:11-18`, `src/index.ts:1-21`, `src/client.ts:1-55`, `src/server.ts:5-120`).
- Version drift matters: local `pi-ai@0.72.1` exports `./google-vertex`; installed `pi-ai@0.70.2` still exposes `./google-gemini-cli` too (`package.json:8-52` vs global nested package `package.json:2-29`).

## Architecture

- `@mariozechner/pi-coding-agent` depends on `@mariozechner/pi-ai`, `@mariozechner/pi-agent-core`, and `@mariozechner/pi-tui` (`packages/coding-agent/package.json:40-45`). If you only consume coding-agent APIs, `pi-ai` comes transitively; add `pi-ai` directly only if you import its root or oauth/provider subpaths yourself.
- `@mariozechner/pi-ai` and `@mariozechner/pi-coding-agent` are dist-based packages (`main`/`types`/`exports` point at `dist/`), so source checkouts alone are not enough; you need an installed or built copy.
- `@openai/codex-sdk` is also dist-based and looks npm-ready.
- `@opencode-ai/sdk` is the odd one: export map points at `src/*.ts`, while `files` whitelists only `dist/`. That makes it workspace/source-oriented, not a normal publish/install target.
- Engine floor if you use pi-coding-agent: Node `>=20.6.0` (`packages/coding-agent/package.json:97-99`). `pi-ai` needs Node `>=20.0.0`; `codex-sdk` needs Node `>=18`.

## Recommendation

Standalone helper package:

```json
{
  "engines": { "node": ">=20.6.0" },
  "dependencies": {
    "@mariozechner/pi-ai": "^0.72.1",
    "@mariozechner/pi-coding-agent": "^0.72.1",
    "@openai/codex-sdk": "0.0.0-dev"
  },
  "devDependencies": {
    "@types/node": "^24.3.0",
    "typescript": "^5.9.2"
  }
}
```

Notes:

- If you only use `@mariozechner/pi-coding-agent`, drop `@mariozechner/pi-ai` from direct deps; it is already transitive.
- If you need to match the installed global copy, pin `@mariozechner/pi-coding-agent` and `@mariozechner/pi-ai` to `0.70.2`; `^0.72.1` matches the checked-out source, not the global install.
- If this is a Pi extension/skill package, move `@mariozechner/pi-ai` and `@mariozechner/pi-coding-agent` to `peerDependencies` with `"*"` and mirror them in `devDependencies`, per upstream guidance (`packages/coding-agent/docs/packages.md:164-168`).
- Do **not** list `@opencode-ai/sdk` as a normal semver dep unless you also vendor its repo checkout/build; current manifest is source-only. If you need it locally, use a workspace/file dependency only.

## Start Here

Open `.repos/pi-mono/packages/coding-agent/package.json` first. It shows the only top-level global install, the export map, the node floor, and the broken `./hooks` subpath in one place.
