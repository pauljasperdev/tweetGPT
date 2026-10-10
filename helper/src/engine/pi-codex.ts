import type { AssistantMessage, Usage } from "@earendil-works/pi-ai";
import { resolveModelAuth } from "../auth.js";
import type { RuntimeConfig } from "../config.js";
import { HelperError } from "../errors.js";
import { buildTweetContext } from "../prompt.js";
import type { GenerateTweetRequest, UsageSummary } from "../protocol.js";
import type { TweetEngine, TweetEngineOptions, TweetEngineResult } from "./types.js";

function extractText(message: AssistantMessage): string {
  return message.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join("");
}

function summarizeUsage(usage: Usage | undefined): UsageSummary | undefined {
  if (!usage) return undefined;
  return {
    input: usage.input,
    output: usage.output,
    cacheRead: usage.cacheRead,
    cacheWrite: usage.cacheWrite,
    totalTokens: usage.totalTokens,
  };
}

export class PiCodexTweetEngine implements TweetEngine {
  constructor(private readonly config: Pick<RuntimeConfig, "authPath" | "model">) {}

  async generateTweet(request: GenerateTweetRequest, options: TweetEngineOptions): Promise<TweetEngineResult> {
    const { runtime, model } = await resolveModelAuth(this.config);
    const context = buildTweetContext(request);

    let message: AssistantMessage;
    try {
      message = await runtime.completeSimple(model, context, {
        transport: "sse",
        reasoning: "minimal",
        maxTokens: request.replyTo ? 400 : 500,
        cacheRetention: "none",
        timeoutMs: request.timeoutMs,
        maxRetries: 0,
        signal: options.signal,
      });
    } catch (error) {
      if (options.signal.aborted) {
        throw new HelperError("timeout", "request timed out", 408);
      }
      throw new HelperError(
        "upstream_error",
        error instanceof Error ? error.message : "upstream request failed",
        502,
      );
    }

    if (message.stopReason === "aborted") {
      throw new HelperError("timeout", "request timed out", 408);
    }
    if (message.stopReason === "error") {
      throw new HelperError("upstream_error", message.errorMessage || "upstream request failed", 502);
    }
    if (message.stopReason === "length") {
      throw new HelperError("upstream_error", "model output was truncated", 502);
    }
    if (message.stopReason === "toolUse") {
      throw new HelperError("upstream_error", "model requested tool use unexpectedly", 502);
    }

    return {
      texts: extractText(message).split(/\r?\n/u),
      model: `${model.provider}/${model.id}`,
      usage: summarizeUsage(message.usage),
    };
  }
}
