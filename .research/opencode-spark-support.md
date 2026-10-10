# OpenCode Codex / Spark support

## TL;DR
- **Codex-auth path:** provider ID is `openai`, so the config/model syntax is `openai/<model-id>`; OpenCode docs define the full ID format as `provider_id/model_id`. The supported Codex example is `openai/gpt-5.3-codex`. (`packages/opencode/src/plugin/codex.ts:363-372,395-473`; `packages/web/src/content/docs/models.mdx:61-63,208-210`)
- **OpenCode Zen path:** provider ID is `opencode`, and the Zen docs explicitly list `gpt-5.3-codex-spark`. Zen syntax is `opencode/gpt-5.3-codex-spark`. (`packages/web/src/content/docs/zen.mdx:73-74,109-111`)
- **Conclusion:** `gpt-5.3-codex-spark` is **not** in the Codex-auth allowlist, so it is unsupported on the ChatGPT/Codex OAuth path.

## Codex-auth allowlist
The built-in Codex plugin only passes these model IDs when `auth.type === "oauth"`:
- `gpt-5.5`
- `gpt-5.2`
- `gpt-5.3-codex`
- `gpt-5.4`
- `gpt-5.4-mini`
- plus any `gpt-X.Y` with `X.Y > 5.4` via the regex fallback. (`packages/opencode/src/plugin/codex.ts:17,363-372`)

Note: the filter is **oauth-only**. If auth is not oauth, the plugin returns `provider.models` unchanged, but that is the raw API-key path, not the Codex subscription flow. (`packages/opencode/src/plugin/codex.ts:364-372,395-473,485-600`)

## Can spark be hacked into config?
Yes, but only as a **shadow/custom model entry**, not via an official Codex-plugin knob.

Why:
- Config schema allows arbitrary `provider.<id>.models` entries and full model metadata (`id`, `name`, `cost`, `limit`, `provider`, `variants`, etc.). (`packages/opencode/src/config/provider.ts:5-56,71-107`)
- OpenCode merges config providers **after** plugin model filtering, so a config-added model can reappear even if the plugin removed the built-in one. (`packages/opencode/src/provider/provider.ts:1130-1260,1364-1379`)
- Tests prove custom aliases/models are supported in config. (`packages/opencode/test/provider/provider.test.ts:228-256,1798-1819`)

Risk:
- You are outside the supported Codex-auth set; this is brittle.
- If the backend rejects the model, OpenCode surfaces `ModelNotFoundError` / `NoSuchModelError`. (`packages/opencode/src/provider/provider.ts:1571-1575,1599-1603`)
- Prompt selection is string-based (`model.api.id.includes("codex")`), so a spark alias would still take the Codex system prompt; the main risk is backend/plan support, not prompt wiring. (`packages/opencode/src/session/system.ts:19-24`)

## Read as a decision
- **Supported Codex auth choice:** `openai/gpt-5.3-codex`
- **Supported Spark choice:** `opencode/gpt-5.3-codex-spark` on Zen
- **Unsupported hack:** `openai/gpt-5.3-codex-spark` (possible to shadow in config, but not an official Codex plugin model)
