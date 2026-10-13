<img src="./docs/logo.png" height="128" />

# Archived
This open-source version of the extension is no longer supported. You can install the proprietary version from https://typebar.app

# tweetGPT Chrome Extension - Community Edition

This fork generates tweets through a local helper process. The Chrome extension needs no configuration: it always talks to `http://127.0.0.1:31415`, and the helper only accepts requests from this extension. Codex/ChatGPT subscription auth stays in the helper on your machine.

## Requirements

- Twitter/X account
- Chrome browser
- Node.js 24+ and Bun
- Codex/ChatGPT subscription access configured through the helper login

## Setup

From the repository root:

```bash
bun install
bun install --cwd helper
bun run --cwd helper auth:login
bun run --cwd helper dev
```

Then:

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Click **Load unpacked** and select this repo folder.
4. Open Twitter/X and generate a tweet.

The manifest pins the extension ID with a `key`, so the helper can recognise the extension by its origin. **Test helper connection** in the TweetGPT settings shows whether the helper is reachable.

## Verification / development

```bash
bun run typecheck
bun run build:ext
bun run build:helper
bun run test:unit
bun run verify:helper
bun run --cwd helper verify --live
```

Package the extension safely:

```bash
bun run package:ext
```

The package step stages only extension runtime files (`manifest.json`, `lib/`, `assets/`, `css/`, `icons/`) and excludes helper code, research files, dependencies, and local tokens.

## Troubleshooting

- **Helper not running**: run `bun run --cwd helper dev`.
- **Helper rejected this extension**: the extension ID must be `aagnbbkandmecekpffjfbpicoccbbnle`; keep the `key` field in `manifest.json` and reload the extension.
- **Codex auth missing**: run `bun run --cwd helper auth:login`, then restart the helper.
- **Model unavailable**: run `bun run --cwd helper auth:status`; by default the helper uses `openai-codex/gpt-6-luna`. Pick another model with `TWEETGPT_MODEL=<id> bun run --cwd helper dev`, e.g. `TWEETGPT_MODEL=gpt-6.1-sol`.
- **Port conflict**: the port is fixed at `31415` on both sides; stop whatever else is using it.

## How to use tweetGPT

When you open Twitter/X, you will see this icon under the tweet section:

<img src="./docs/screenshot.png" height="120">

On a tweet you can reply to, the reply box is focused and up to five drafts open by themselves, written in the voice described in `helper/voice.md`. Press the icon to get new ones. Pick one and it is inserted into the composer, where you can keep editing.

For a reply, it generates based on the original tweet. A new tweet uses a placeholder topic for now.

<img src="./docs/reply.gif" height="379" width="609">

## ⚠️ Warning

Depending on the tweet type, TweetGPT can sometimes generate controversial or offensive tweets. You are responsible for what you post.
