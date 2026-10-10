# Code Context

## Files Retrieved
1. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/samples/structured_output.ts` (lines 1-22) - exact one-prompt structured-output sample.
2. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/README.md` (lines 53-84, 108-149) - structured output docs plus thread/env/config knobs.
3. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/codex.ts` (lines 11-37) - `startThread()` entrypoint.
4. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/thread.ts` (lines 65-137) - `run()`/`runStreamed()` wiring; turn `outputSchema` + thread options to exec.
5. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/threadOptions.ts` (lines 1-19) - `model`, `sandboxMode`, `approvalPolicy`, `skipGitRepoCheck`.
6. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/turnOptions.ts` (lines 1-5) - per-turn `outputSchema`.
7. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/outputSchemaFile.ts` (lines 10-40) - schema must be plain JSON object; temp file cleanup.
8. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/exec.ts` (lines 72-135) - exact CLI flags emitted.
9. `/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/tests/run.test.ts` (lines 380-404, 423-481, 531-586) - approval-policy override and outputSchema forwarding.
10. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/exec/src/cli.rs` (lines 22-66) - CLI `--skip-git-repo-check`, `--output-schema`, `--json`.
11. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/utils/cli/src/shared_options.rs` (lines 19-56, 120-160) - CLI `--model`, `--sandbox`, `--dangerously-bypass-approvals-and-sandbox`, `approvalPolicy`.
12. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/exec/src/lib.rs` (lines 924-965) - request uses `config.model.clone()`, `approval_policy`, `sandbox`.
13. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/models-manager/models.json` (lines 1-26, 268-280) - catalog shows `gpt-5.5` and `gpt-5.3-codex`.
14. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/models-manager/src/manager.rs` (lines 394-457) - longest-prefix lookup; unknown slug stays unchanged.
15. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/models-manager/src/model_info.rs` (lines 80-99) - fallback metadata for unknown model.
16. `/Users/paul/dev/forks/tweetGPT/.repos/codex/codex-rs/models-manager/src/manager_tests.rs` (lines 240-319) - tests for unknown model and namespaced suffix fallback.

## Key Code
- Usage shape:
```ts
import { Codex } from "@openai/codex-sdk";

const codex = new Codex();
const thread = codex.startThread({
  model: "gpt-5.3-codex", // gpt-5.3-codex-spark not in repo catalog; swap to gpt-5.5 for current default/general model
  sandboxMode: "danger-full-access",
  approvalPolicy: "never",
  // skipGitRepoCheck: true, // only if cwd is not a git repo
});

const schema = {
  type: "object",
  properties: {
    answer: { type: "string" },
  },
  required: ["answer"],
  additionalProperties: false,
} as const;

const turn = await thread.run("Tell me the answer", { outputSchema: schema });
console.log(turn.finalResponse);
```
- `thread.ts:74-94` - `outputSchema` is per-turn, thread options are forwarded separately:
```ts
const { schemaPath, cleanup } = await createOutputSchemaFile(turnOptions.outputSchema);
const generator = this._exec.run({
  input: prompt,
  model: options?.model,
  sandboxMode: options?.sandboxMode,
  skipGitRepoCheck: options?.skipGitRepoCheck,
  outputSchemaFile: schemaPath,
  approvalPolicy: options?.approvalPolicy,
});
```
- `outputSchemaFile.ts:10-31` - only plain JSON objects accepted, temp `schema.json` is cleaned up after the turn.
- `exec.ts:73-135` - CLI flags are emitted literally as `exec --experimental-json --model ... --sandbox ... --skip-git-repo-check --output-schema ... --config approval_policy=...`.
- `manager.rs:403-457` + `model_info.rs:80-99` - unknown model slug is not rewritten; it only gets fallback metadata and a warning.

## Architecture
`Codex.startThread()` creates a `Thread`. `Thread.run()` is the user-facing one-shot call. `outputSchema` lives on `TurnOptions`, gets serialized to a temp file, and is forwarded to the CLI as `--output-schema`. `model`, `sandboxMode`, and `approvalPolicy` live on `ThreadOptions`, so they are thread-scoped and reused across turns.

The CLI path does not have a separate TypeScript `--yolo` switch. The underlying CLI does expose `--dangerously-bypass-approvals-and-sandbox` / `--yolo`, but the SDK surface here only forwards `sandboxMode` plus `approvalPolicy`. For a no-constraints run in TS, `sandboxMode: "danger-full-access"` + `approvalPolicy: "never"` is the direct SDK-equivalent path.

Model availability is explicit, not magical: the repo catalog contains `gpt-5.5` and `gpt-5.3-codex`, but no `gpt-5.3-codex-spark` hit in repo search. The model manager keeps the requested slug unchanged; if it is unknown, it falls back to generic metadata and warns, so there is no automatic alias rewrite from `*-spark` to another model.

## Start Here
`/Users/paul/dev/forks/tweetGPT/.repos/codex/sdk/typescript/src/thread.ts` - best first open; it shows the exact bridge from `outputSchema` + thread options to the CLI.
