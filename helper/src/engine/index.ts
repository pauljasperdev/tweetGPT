import type { RuntimeConfig } from "../config.js";
import type { TweetEngine } from "./types.js";
import { MockTweetEngine } from "./mock.js";
import { PiCodexTweetEngine } from "./pi-codex.js";

export function createTweetEngine(config: Pick<RuntimeConfig, "mode" | "authPath" | "model">): TweetEngine {
  if (config.mode === "mock") return new MockTweetEngine();
  return new PiCodexTweetEngine(config);
}

export type { TweetEngine, TweetEngineOptions, TweetEngineResult } from "./types.js";
