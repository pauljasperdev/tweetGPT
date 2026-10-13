import { createServer } from "node:http";
import { mkdirSync, readFileSync, writeFileSync, createWriteStream } from "node:fs";
import { join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { DEFAULT_MODEL, EXTENSION_ORIGIN, FIXED_PROVIDER, MAX_BODY_BYTES } from "../src/config.js";
import { fromHelperRoot } from "../src/paths.js";

const live = process.argv.includes("--live");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const artifactDir = fromHelperRoot(".verify-artifacts", timestamp);
mkdirSync(artifactDir, { recursive: true });

writeFileSync(join(artifactDir, "node-version.txt"), `${process.version}\n`);
writeFileSync(join(artifactDir, "package-version.txt"), readFileSync(fromHelperRoot("package.json"), "utf8"));

async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("failed to allocate port"));
        return;
      }
      const port = address.port;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

type CaseDef = {
  name: string;
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: string;
  timeoutMs?: number;
  expect: {
    status: number;
    ok?: boolean;
    code?: string;
    model?: string;
    maxTextLength?: number;
  };
};

function requestBody(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    v: 1,
    id: "verify",
    op: "tweet.generate",
    locale: "en-US",
    topic: "local helper",
    maxChars: 260,
    timeoutMs: live ? 60000 : 1000,
    ...overrides,
  });
}

const auth = { Origin: EXTENSION_ORIGIN, "Content-Type": "application/json" };
const wrongOrigin = { Origin: "https://evil.example", "Content-Type": "application/json" };
const otherExtension = { Origin: "chrome-extension://bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "Content-Type": "application/json" };
const configuredModel = process.env.TWEETGPT_MODEL?.trim() || DEFAULT_MODEL;

const mockCases: CaseDef[] = [
  { name: "health", method: "GET", path: "/health", expect: { status: 200, ok: true } },
  { name: "not_found", method: "GET", path: "/missing", expect: { status: 404, code: "not_found" } },
  { name: "wrong_origin", method: "POST", path: "/v1/generate-tweet", headers: wrongOrigin, body: requestBody({ id: "wrong-origin" }), expect: { status: 403, code: "forbidden" } },
  { name: "other_extension", method: "POST", path: "/v1/generate-tweet", headers: otherExtension, body: requestBody({ id: "other-extension" }), expect: { status: 403, code: "forbidden" } },
  { name: "invalid_json", method: "POST", path: "/v1/generate-tweet", headers: auth, body: "{not-json", expect: { status: 400, code: "bad_request" } },
  { name: "missing_required_field", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "" }), expect: { status: 400, code: "bad_request" } },
  { name: "oversized_body", method: "POST", path: "/v1/generate-tweet", headers: auth, body: "x".repeat(MAX_BODY_BYTES + 1), expect: { status: 413, code: "payload_too_large" } },
  { name: "method_not_allowed", method: "GET", path: "/v1/generate-tweet", expect: { status: 405, code: "method_not_allowed" } },
  { name: "mock_success", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "mock-success" }), expect: { status: 200, ok: true, model: "mock/model", maxTextLength: 260 } },
  { name: "mock_timeout", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "mock-timeout", topic: "__timeout__", timeoutMs: 1000 }), timeoutMs: 5000, expect: { status: 408, code: "timeout" } },
  { name: "mock_upstream_error", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "mock-error", topic: "__error__" }), expect: { status: 502, code: "upstream_error" } },
  { name: "mock_too_long_output", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "mock-long", topic: "__long__" }), expect: { status: 502, code: "upstream_error" } },
];

const liveCases: CaseDef[] = [
  { name: "health", method: "GET", path: "/health", expect: { status: 200, ok: true } },
  { name: "wrong_origin", method: "POST", path: "/v1/generate-tweet", headers: wrongOrigin, body: requestBody({ id: "live-wrong-origin" }), expect: { status: 403, code: "forbidden" } },
  { name: "other_extension", method: "POST", path: "/v1/generate-tweet", headers: otherExtension, body: requestBody({ id: "live-other-extension" }), expect: { status: 403, code: "forbidden" } },
  { name: "live_success", method: "POST", path: "/v1/generate-tweet", headers: auth, body: requestBody({ id: "live-success", topic: "local helper verification", timeoutMs: 60000 }), timeoutMs: 70000, expect: { status: 200, ok: true, model: `${FIXED_PROVIDER}/${configuredModel}`, maxTextLength: 260 } },
];

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function waitForHealth(baseUrl: string): Promise<void> {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetchWithTimeout(`${baseUrl}/health`, {}, 1000);
      if (response.status === 200) return;
    } catch {
      // Retry until deadline.
    }
    await sleep(250);
  }
  throw new Error("helper did not become healthy within 15s");
}

function startServer(port: number): ChildProcess {
  const log = createWriteStream(join(artifactDir, "server.log"), { flags: "a" });
  const child = spawn("bun", ["run", "dev"], {
    cwd: fromHelperRoot(),
    env: {
      ...process.env,
      TWEETGPT_HELPER_MODE: live ? "real" : "mock",
      TWEETGPT_HELPER_PORT: String(port),
      ...(process.env.TWEETGPT_AUTH_PATH ? { TWEETGPT_AUTH_PATH: process.env.TWEETGPT_AUTH_PATH } : {}),
      ...(process.env.TWEETGPT_MODEL ? { TWEETGPT_MODEL: process.env.TWEETGPT_MODEL } : {}),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout?.pipe(log);
  child.stderr?.pipe(log);
  return child;
}

async function runCase(baseUrl: string, caseDef: CaseDef): Promise<void> {
  const startedAt = Date.now();
  const requestArtifact = {
    method: caseDef.method,
    path: caseDef.path,
    headers: caseDef.headers,
    body: caseDef.body,
  };
  writeFileSync(join(artifactDir, `${caseDef.name}.request.json`), JSON.stringify(requestArtifact, null, 2));

  const response = await fetchWithTimeout(
    `${baseUrl}${caseDef.path}`,
    {
      method: caseDef.method,
      headers: caseDef.headers,
      body: caseDef.method === "GET" ? undefined : caseDef.body,
    },
    caseDef.timeoutMs ?? (live ? 70_000 : 10_000),
  );
  const text = await response.text();
  const elapsedMs = Date.now() - startedAt;
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { raw: text };
  }

  writeFileSync(
    join(artifactDir, `${caseDef.name}.response.json`),
    JSON.stringify({ status: response.status, elapsedMs, body: parsed }, null, 2),
  );

  const failures: string[] = [];
  if (response.status !== caseDef.expect.status) failures.push(`status ${response.status} !== ${caseDef.expect.status}`);
  if (caseDef.expect.ok !== undefined && parsed.ok !== caseDef.expect.ok) failures.push(`ok ${parsed.ok} !== ${caseDef.expect.ok}`);
  if (caseDef.expect.code && parsed.error?.code !== caseDef.expect.code) failures.push(`code ${parsed.error?.code} !== ${caseDef.expect.code}`);
  if (caseDef.expect.model && parsed.model !== caseDef.expect.model) failures.push(`model ${parsed.model} !== ${caseDef.expect.model}`);
  if (caseDef.expect.maxTextLength !== undefined) {
    const texts: unknown[] = Array.isArray(parsed.texts) ? parsed.texts : [];
    if (texts.length < 1 || texts.length > 5 || new Set(texts).size !== texts.length) failures.push(`expected 1 to 5 distinct texts, got ${JSON.stringify(parsed.texts)}`);
    for (const text of texts) {
      if (typeof text !== "string" || text.length === 0) failures.push("text is empty/non-string");
      else if (text.length > caseDef.expect.maxTextLength) failures.push(`text length ${text.length} > ${caseDef.expect.maxTextLength}`);
    }
  }

  const result = { case: caseDef.name, status: response.status, elapsedMs, ok: failures.length === 0, failures };
  writeFileSync(join(artifactDir, "results.ndjson"), `${JSON.stringify(result)}\n`, { flag: "a" });
  if (failures.length > 0) throw new Error(`${caseDef.name}: ${failures.join("; ")}`);
  console.log(`ok ${caseDef.name} ${response.status} ${elapsedMs}ms`);
}

let child: ChildProcess | undefined;
try {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  child = startServer(port);
  await waitForHealth(baseUrl);

  for (const caseDef of live ? liveCases : mockCases) {
    await runCase(baseUrl, caseDef);
  }

  console.log(`Verification passed. Artifacts: ${artifactDir}`);
} catch (error) {
  console.error(`Verification failed. Artifacts: ${artifactDir}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  if (child && !child.killed) {
    child.kill("SIGTERM");
    await sleep(500);
    if (!child.killed) child.kill("SIGKILL");
  }
}
