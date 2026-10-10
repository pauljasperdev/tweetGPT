# Code Context

## Files Retrieved
1. `.repos/pi-mono/packages/coding-agent/docs/usage.md` (lines 142-207) - top-level `--mode`, `--print`, model, tool, resource, session flags.
2. `.repos/pi-mono/packages/coding-agent/docs/json.md` (lines 1-81) - JSON mode command + stdout JSONL contract.
3. `.repos/pi-mono/packages/coding-agent/docs/rpc.md` (lines 1-77) - RPC mode contract, stdin/stdout JSON protocol, strict framing.
4. `.repos/pi-mono/packages/coding-agent/docs/sdk.md` (lines 1079-1087) - subprocess RPC example `pi --mode rpc --no-session`.
5. `.repos/pi-mono/packages/coding-agent/src/cli/args.ts` (lines 10-49, 59-180, 211-240) - actual flag parsing/help text.
6. `.repos/pi-mono/packages/coding-agent/src/modes/print-mode.ts` (lines 1-7, 32-157) - print/json single-shot behavior.
7. `.repos/pi-mono/packages/coding-agent/src/modes/rpc/jsonl.ts` (lines 1-58) - LF-only JSONL framing, no `readline`.
8. `.repos/pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts` (lines 1-10, 48-55, 345-380) - duplex RPC protocol, stdout event/response emission.
9. `.repos/pi-mono/packages/coding-agent/src/modes/rpc/rpc-client.ts` (lines 1-5, 26-39, 68-107, 162-190, 401-514) - persistent child-process client.
10. `.repos/pi-mono/packages/coding-agent/src/core/model-resolver.ts` (lines 13-20, 67-113, 188-240, 325-417) - provider/model selection rules.
11. `.repos/pi-mono/packages/ai/src/models.generated.ts` (lines 7423-7547) - `openai-codex` / `gpt-5.3-codex-spark` metadata.

## Key Code
- Exact mode commands:
  - `pi --mode json "Your prompt"`
  - `pi -p "prompt"` / `pi --print "prompt"`
  - `pi --mode rpc [options]`
- Minimal helper backend, no disk/session/tool/context/extension state:
  - `pi --mode rpc --provider openai-codex --model gpt-5.3-codex-spark --no-session --no-tools --no-extensions --no-context-files`
- Same model, provider-prefix form:
  - `pi --mode rpc --model openai-codex/gpt-5.3-codex-spark --no-session --no-tools --no-extensions --no-context-files`
- Tool/resource disables:
  - `--no-tools` / `-nt` = all tools off
  - `--no-builtin-tools` / `-nbt` = built-ins off only
  - `--tools read,grep,find,ls` = allowlist
  - `--no-extensions` / `-ne`
  - `--no-context-files` / `-nc`
  - `--no-session` = ephemeral session file
- Model flag semantics:
  - `--provider <name>` + `--model <pattern>` is valid
  - `--model provider/id` also valid; provider inferred when prefix matches a known provider
  - avoid bare `--model gpt-5.3-codex-spark`; same id exists under other providers, so provider/prefix keeps it deterministic
- `gpt-5.3-codex-spark` metadata:
  - `provider: "openai-codex"`
  - `api: "openai-codex-responses"`
  - `input: ["text"]` (text-only)
  - `reasoning: true`
  - `thinkingLevelMap: { minimal: "low", xhigh: "xhigh" }`
  - `contextWindow: 128000`
- Output parsing:
  - JSON mode = stdout JSONL; first line session header, then event objects
  - example filter: `pi --mode json "List files" 2>/dev/null | jq -c 'select(.type == "message_end")'`
  - `--print` = plain text final assistant output; errors on stderr
  - RPC = stdin commands + stdout JSONL responses/events; responses carry `type:"response"`, `command`, `success`, optional `id`, `data`, `error`
  - parser must split on `\n` only; do not use Node `readline`

## Architecture
`parseArgs()` routes `--mode` / `--print` / model-tool-resource flags into the runtime. `print-mode.ts` is single-shot: subscribe to session events, emit JSONL only when `mode === "json"`, otherwise print final assistant text. `rpc-mode.ts` is the duplex long-lived path: read JSON commands from stdin, emit JSONL to stdout, keep session state alive, and forward extension UI requests too. `rpc-client.ts` is the subprocess wrapper: spawn once with `node ... --mode rpc`, keep the child alive, correlate responses by `id`, and reuse the same process for many prompts. This is the main persistent-process path.

## Tradeoff
- Persistent process (`pi --mode rpc ...`): best latency, multi-turn control, `prompt`/`steer`/`follow_up`/`abort`/`get_state`/model switches, one startup cost. More protocol/lifecycle work.
- Spawn-per-request (`pi --print ...` or `pi --mode json ...`): simplest, isolated, no long-lived worker. Cost = repeated startup/auth/model resolution, no bidirectional control after each request.
- `--no-session` only makes the session ephemeral; it does NOT replace process persistence.
- For Node/TS apps, docs explicitly prefer `AgentSession` directly over subprocess RPC.

## Start Here
`.repos/pi-mono/packages/coding-agent/docs/rpc.md` first. It states the wire contract and points to the subprocess client; then open `.repos/pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts` for the actual parser/emitter code.
