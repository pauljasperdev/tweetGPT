import http, { type IncomingMessage, type ServerResponse } from "node:http";
import { getAuthStatusSummary } from "./auth.js";
import { EXTENSION_ORIGIN, type RuntimeConfig } from "./config.js";
import { HelperError } from "./errors.js";
import { createTweetEngine, type TweetEngine } from "./engine/index.js";
import { normalizeCandidates } from "./normalize.js";
import {
  HELPER_NAME,
  PROTOCOL_VERSION,
  type GenerateTweetError,
  type GenerateTweetSuccess,
  type HealthResponse,
  generateTweetRequestSchema,
} from "./protocol.js";

export type ServerOptions = {
  config: RuntimeConfig;
  engine?: TweetEngine;
};

type JsonRecord = Record<string, unknown>;

function writeJson(res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(json).toString(),
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(json);
}

function errorBody(error: HelperError, id?: string): GenerateTweetError {
  return {
    ok: false,
    v: PROTOCOL_VERSION,
    ...(id ? { id } : {}),
    error: {
      code: error.code,
      message: error.message,
      ...(error.details === undefined ? {} : { details: error.details }),
    },
  };
}

// Browsers attach Origin to every cross-origin POST, so this keeps web pages and other extensions out.
// Requests without Origin come from local non-browser processes, which could forge the header anyway.
function isAllowedCaller(req: IncomingMessage, port: number): boolean {
  const host = req.headers.host;
  if (host !== `127.0.0.1:${port}` && host !== `localhost:${port}`) return false;
  const origin = req.headers.origin;
  if (origin !== undefined && origin !== EXTENSION_ORIGIN) return false;
  return /^application\/json\b/iu.test(req.headers["content-type"] ?? "");
}

function maybeRequestId(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const id = (value as JsonRecord).id;
  return typeof id === "string" && id.trim().length > 0 ? id.trim().slice(0, 128) : undefined;
}

function readBody(req: IncomingMessage, limitBytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    let settled = false;

    req.on("data", (chunk: Buffer) => {
      if (settled) return;
      total += chunk.length;
      if (total > limitBytes) {
        settled = true;
        req.resume();
        reject(new HelperError("payload_too_large", "request body exceeds 16 KiB", 413));
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (settled) return;
      settled = true;
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });
}

async function handleHealth(res: ServerResponse, config: RuntimeConfig): Promise<void> {
  const status = await getAuthStatusSummary(config);
  const body: HealthResponse = {
    ok: true,
    v: PROTOCOL_VERSION,
    name: HELPER_NAME,
    mode: config.mode,
    provider: config.provider,
    model: config.model,
    auth: {
      configured: status.configured,
      ...(status.source ? { source: status.source } : {}),
    },
  };
  writeJson(res, 200, body);
}

async function handleGenerate(
  req: IncomingMessage,
  res: ServerResponse,
  options: Required<ServerOptions>,
): Promise<void> {
  if (!isAllowedCaller(req, req.socket.localPort ?? options.config.port)) {
    writeJson(res, 403, errorBody(new HelperError("forbidden", "caller is not the TweetGPT extension", 403)));
    return;
  }

  const contentLength = req.headers["content-length"];
  if (contentLength && Number(contentLength) > options.config.bodyLimitBytes) {
    writeJson(res, 413, errorBody(new HelperError("payload_too_large", "request body exceeds 16 KiB", 413)));
    return;
  }

  let parsed: unknown;
  try {
    const body = await readBody(req, options.config.bodyLimitBytes);
    parsed = JSON.parse(body);
  } catch (error) {
    const helperError =
      error instanceof HelperError ? error : new HelperError("bad_request", "invalid JSON request body", 400);
    writeJson(res, helperError.status, errorBody(helperError));
    return;
  }

  const schemaResult = generateTweetRequestSchema.safeParse(parsed);
  if (!schemaResult.success) {
    const details = schemaResult.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
    writeJson(
      res,
      400,
      errorBody(new HelperError("bad_request", "request body failed validation", 400, details), maybeRequestId(parsed)),
    );
    return;
  }

  const request = schemaResult.data;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), request.timeoutMs);

  try {
    const engineResult = await options.engine.generateTweet(request, { signal: controller.signal });
    const texts = normalizeCandidates(engineResult.texts, request.maxChars);
    const response: GenerateTweetSuccess = {
      ok: true,
      v: PROTOCOL_VERSION,
      id: request.id,
      texts,
      model: engineResult.model,
      ...(engineResult.usage ? { usage: engineResult.usage } : {}),
    };
    writeJson(res, 200, response);
  } catch (error) {
    const helperError =
      error instanceof HelperError
        ? error
        : controller.signal.aborted
          ? new HelperError("timeout", "request timed out", 408)
          : new HelperError("upstream_error", error instanceof Error ? error.message : "upstream request failed", 502);
    writeJson(res, helperError.status, errorBody(helperError, request.id));
  } finally {
    clearTimeout(timeout);
  }
}

export function createTweetGptServer(options: ServerOptions): http.Server {
  const fullOptions: Required<ServerOptions> = {
    ...options,
    engine: options.engine ?? createTweetEngine(options.config),
  };

  return http.createServer((req, res) => {
    const startedAt = Date.now();
    res.on("finish", () => {
      console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode} ${Date.now() - startedAt}ms`);
    });
    void (async () => {
      const rawUrl = req.url ?? "/";
      const url = new URL(rawUrl, `http://${fullOptions.config.host}:${fullOptions.config.port}`);

      if (url.pathname === "/health") {
        if (req.method !== "GET") {
          writeJson(
            res,
            405,
            errorBody(new HelperError("method_not_allowed", "method not allowed", 405)),
            { Allow: "GET" },
          );
          return;
        }
        await handleHealth(res, fullOptions.config);
        return;
      }

      if (url.pathname === "/v1/generate-tweet") {
        if (req.method !== "POST") {
          writeJson(
            res,
            405,
            errorBody(new HelperError("method_not_allowed", "method not allowed", 405)),
            { Allow: "POST" },
          );
          return;
        }
        await handleGenerate(req, res, fullOptions);
        return;
      }

      writeJson(res, 404, errorBody(new HelperError("not_found", "not found", 404)));
    })().catch((error) => {
      const helperError =
        error instanceof HelperError
          ? error
          : new HelperError("internal_error", error instanceof Error ? error.message : "internal error", 500);
      writeJson(res, helperError.status, errorBody(helperError));
    });
  });
}
