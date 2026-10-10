import { resolveHelperPath } from "./paths.js";
import type { HelperMode } from "./protocol.js";

export const FIXED_PROVIDER = "openai-codex" as const;
export const DEFAULT_MODEL = "gpt-6-luna";
export const DEFAULT_PORT = 31415;
export const DEFAULT_HOST = "127.0.0.1";
// Pinned by the "key" field in the extension manifest.
export const EXTENSION_ORIGIN = "chrome-extension://aagnbbkandmecekpffjfbpicoccbbnle";
export const MAX_BODY_BYTES = 16 * 1024;

export type RuntimeConfig = {
  host: typeof DEFAULT_HOST;
  port: number;
  mode: HelperMode;
  provider: typeof FIXED_PROVIDER;
  model: string;
  authPath?: string;
  bodyLimitBytes: number;
};

function parsePort(value: string | undefined): number {
  if (!value || value.trim().length === 0) return DEFAULT_PORT;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid TWEETGPT_HELPER_PORT: ${value}`);
  }
  return port;
}

function parseMode(value: string | undefined): HelperMode {
  if (!value || value === "real") return "real";
  if (value === "mock") return "mock";
  throw new Error(`Invalid TWEETGPT_HELPER_MODE: ${value}`);
}

export function readRuntimeConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  return {
    host: DEFAULT_HOST,
    port: parsePort(env.TWEETGPT_HELPER_PORT),
    mode: parseMode(env.TWEETGPT_HELPER_MODE),
    provider: FIXED_PROVIDER,
    model: env.TWEETGPT_MODEL?.trim() || DEFAULT_MODEL,
    authPath: env.TWEETGPT_AUTH_PATH ? resolveHelperPath(env.TWEETGPT_AUTH_PATH, env.TWEETGPT_AUTH_PATH) : undefined,
    bodyLimitBytes: MAX_BODY_BYTES,
  };
}
