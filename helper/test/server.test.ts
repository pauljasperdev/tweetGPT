import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import test from "node:test";
import { DEFAULT_HOST, DEFAULT_MODEL, DEFAULT_PORT, EXTENSION_ORIGIN, FIXED_PROVIDER, MAX_BODY_BYTES, type RuntimeConfig } from "../src/config.js";
import { createTweetGptServer } from "../src/server.js";

const config: RuntimeConfig = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  mode: "mock",
  provider: FIXED_PROVIDER,
  model: DEFAULT_MODEL,
  bodyLimitBytes: MAX_BODY_BYTES,
};

async function withServer<T>(fn: (baseUrl: string) => Promise<T>): Promise<T> {
  const server = createTweetGptServer({ config });
  await new Promise<void>((resolve) => server.listen(0, DEFAULT_HOST, resolve));
  try {
    const address = server.address() as AddressInfo | null;
    assert.ok(address);
    return await fn(`http://${DEFAULT_HOST}:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => (server as http.Server).close((error) => (error ? reject(error) : resolve())));
  }
}

async function json(response: Response): Promise<any> {
  return response.json();
}

const extensionHeaders = { Origin: EXTENSION_ORIGIN, "Content-Type": "application/json" };

const validBody = {
  v: 1,
  id: "test",
  op: "tweet.generate",
  locale: "en-US",
  topic: "local helper",
  maxChars: 260,
  timeoutMs: 1000,
};

test("health is unauthenticated", async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/health`);
    const body = await json(response);
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
  });
});

test("unknown path returns not_found", async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/missing`);
    const body = await json(response);
    assert.equal(response.status, 404);
    assert.equal(body.error.code, "not_found");
  });
});

// fetch() refuses to override Host, so forbidden-caller cases go through node:http.
function rawPost(base: string, headers: Record<string, string>): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const req = http.request(`${base}/v1/generate-tweet`, { method: "POST", headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, body: JSON.parse(Buffer.concat(chunks).toString("utf8")) }));
    });
    req.on("error", reject);
    req.end(JSON.stringify(validBody));
  });
}

test("only the extension origin may generate", async () => {
  await withServer(async (base) => {
    for (const headers of [
      { Origin: "https://evil.example", "Content-Type": "application/json" },
      { Origin: "chrome-extension://bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "Content-Type": "application/json" },
      { Origin: "null", "Content-Type": "application/json" },
      { Origin: EXTENSION_ORIGIN, "Content-Type": "text/plain" },
      { ...extensionHeaders, Host: "evil.example:31415" },
    ]) {
      const response = await rawPost(base, headers);
      assert.equal(response.status, 403, JSON.stringify(headers));
      assert.equal(response.body.error.code, "forbidden");
    }

    assert.equal((await rawPost(base, extensionHeaders)).status, 200);
    assert.equal((await rawPost(base, { "Content-Type": "application/json" })).status, 200);
  });
});

test("schema failures are typed", async () => {
  await withServer(async (base) => {
    let response: Response;

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: "{not-json",
    });
    assert.equal(response.status, 400);
    assert.equal((await json(response)).error.code, "bad_request");

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: JSON.stringify({ ...validBody, id: "" }),
    });
    assert.equal(response.status, 400);
    assert.equal((await json(response)).error.code, "bad_request");
  });
});

test("success and normalized overflow paths", async () => {
  await withServer(async (base) => {
    let response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: JSON.stringify(validBody),
    });
    let body = await json(response);
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.model, "mock/model");
    assert.equal(body.texts.length, 5);
    assert.equal(new Set(body.texts).size, 5);
    for (const text of body.texts) assert.ok(text.length > 0 && text.length <= validBody.maxChars);

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: JSON.stringify({ ...validBody, id: "long", topic: "__long__" }),
    });
    body = await json(response);
    assert.equal(response.status, 502);
    assert.equal(body.error.code, "upstream_error");
  });
});

test("method, payload, upstream, and timeout failures are typed", async () => {
  await withServer(async (base) => {
    let response = await fetch(`${base}/v1/generate-tweet`);
    assert.equal(response.status, 405);
    assert.equal((await json(response)).error.code, "method_not_allowed");

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: "x".repeat(MAX_BODY_BYTES + 1),
    });
    assert.equal(response.status, 413);
    assert.equal((await json(response)).error.code, "payload_too_large");

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: JSON.stringify({ ...validBody, id: "error", topic: "__error__" }),
    });
    assert.equal(response.status, 502);
    assert.equal((await json(response)).error.code, "upstream_error");

    response = await fetch(`${base}/v1/generate-tweet`, {
      method: "POST",
      headers: extensionHeaders,
      body: JSON.stringify({ ...validBody, id: "timeout", topic: "__timeout__" }),
    });
    assert.equal(response.status, 408);
    assert.equal((await json(response)).error.code, "timeout");
  });
});
