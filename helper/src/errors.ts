import type { ErrorCode } from "./protocol.js";

export class HelperError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: ErrorCode, message: string, status: number, details?: unknown) {
    super(message);
    this.name = "HelperError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function toPublicMessage(error: unknown): string {
  if (error instanceof HelperError) return error.message;
  if (error instanceof Error && error.name === "AbortError") return "request timed out";
  return "internal error";
}
