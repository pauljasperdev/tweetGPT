import { HelperError } from "../errors.js";
import { MAX_CANDIDATES } from "../normalize.js";
import type { GenerateTweetRequest } from "../protocol.js";
import type { TweetEngine, TweetEngineOptions, TweetEngineResult } from "./types.js";

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new HelperError("timeout", "request timed out", 408));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new HelperError("timeout", "request timed out", 408));
      },
      { once: true },
    );
  });
}

export class MockTweetEngine implements TweetEngine {
  async generateTweet(request: GenerateTweetRequest, options: TweetEngineOptions): Promise<TweetEngineResult> {
    if (request.topic === "__timeout__") {
      await delay(request.timeoutMs + 5_000, options.signal);
    }

    if (request.topic === "__error__") {
      throw new HelperError("upstream_error", "mock upstream error", 502);
    }

    if (request.topic === "__empty__") {
      return { texts: ["   "], model: "mock/model" };
    }

    if (request.topic === "__long__") {
      return { texts: ["x".repeat(request.maxChars + 1)], model: "mock/model" };
    }

    const topic = request.topic ? ` about ${request.topic}` : "";
    const reply = request.replyTo ? " as a reply" : "";
    return {
      texts: Array.from({ length: MAX_CANDIDATES }, (_, i) => `Mock tweet ${i + 1}${topic}${reply}.`),
      model: "mock/model",
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
      },
    };
  }
}
