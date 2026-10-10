import type { GenerateTweetRequest, UsageSummary } from "../protocol.js";

export type TweetEngineResult = {
  texts: string[];
  model: string;
  usage?: UsageSummary;
};

export type TweetEngineOptions = {
  signal: AbortSignal;
};

export interface TweetEngine {
  generateTweet(request: GenerateTweetRequest, options: TweetEngineOptions): Promise<TweetEngineResult>;
}
