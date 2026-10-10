import { z } from "zod";

export const HELPER_NAME = "tweetgpt-local-helper";
export const PROTOCOL_VERSION = 1 as const;
export const GENERATE_OP = "tweet.generate" as const;

export type HelperMode = "mock" | "real";

const optionalTrimmed = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().max(max).optional(),
  ).transform((value) => (value && value.length > 0 ? value : undefined));

export const generateTweetRequestSchema = z
  .object({
    v: z.literal(PROTOCOL_VERSION),
    id: z.string().trim().min(1).max(128),
    op: z.literal(GENERATE_OP),
    locale: z.string().trim().min(1).max(32),
    topic: optionalTrimmed(500),
    replyTo: optionalTrimmed(2000),
    maxChars: z.number().int().min(1).max(280).default(280),
    timeoutMs: z.number().int().min(1000).max(60000).default(30000),
  })
  .strict();

export type GenerateTweetRequest = z.infer<typeof generateTweetRequestSchema>;

export type UsageSummary = {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  totalTokens: number;
};

export type GenerateTweetSuccess = {
  ok: true;
  v: typeof PROTOCOL_VERSION;
  id: string;
  texts: string[];
  model: string;
  usage?: UsageSummary;
};

export type ErrorCode =
  | "forbidden"
  | "bad_request"
  | "auth_missing"
  | "model_missing"
  | "timeout"
  | "upstream_error"
  | "method_not_allowed"
  | "not_found"
  | "payload_too_large"
  | "internal_error";

export type GenerateTweetError = {
  ok: false;
  v: typeof PROTOCOL_VERSION;
  id?: string;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
};

export type GenerateTweetResponse = GenerateTweetSuccess | GenerateTweetError;

export type HealthResponse = {
  ok: true;
  v: typeof PROTOCOL_VERSION;
  name: typeof HELPER_NAME;
  mode: HelperMode;
  provider: "openai-codex";
  model: string;
  auth: {
    configured: boolean;
    source?: string;
  };
};
