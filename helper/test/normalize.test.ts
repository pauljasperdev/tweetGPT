import assert from "node:assert/strict";
import test from "node:test";
import { HelperError } from "../src/errors.js";
import { normalizeCandidates, normalizeTweetText } from "../src/normalize.js";
import { buildTweetContext } from "../src/prompt.js";

test("normalizes plain model output", () => {
  assert.equal(normalizeTweetText('  "Tweet: hello world"  ', 280), "hello world");
});

test("removes fences, labels, whitespace, and duplicate signature", () => {
  assert.equal(normalizeTweetText('```text\n- Tweet: hello\nworld — tweetGPT\n```', 280), "hello world");
});

test("removes common AI openers and em dashes", () => {
  assert.equal(
    normalizeTweetText("Great job on the landing page! I think B — if the headline does the work.", 280),
    "B, if the headline does the work.",
  );
});

test("keeps quotes that belong to quoted phrases", () => {
  assert.equal(
    normalizeTweetText("“Compiles” is a bold substitute for “works.”", 280),
    "“Compiles” is a bold substitute for “works.”",
  );
  assert.equal(normalizeTweetText("'don't ship it yet'", 280), "don't ship it yet");
});

test("rejects empty output", () => {
  assert.throws(() => normalizeTweetText("   ", 280), HelperError);
});

test("rejects over-long output", () => {
  assert.throws(() => normalizeTweetText("x".repeat(281), 280), /maxChars/);
});

test("keeps up to five distinct usable candidates", () => {
  assert.deepEqual(
    normalizeCandidates(["1. gz mate", "", "2) 5.5 is faster though", "gz mate", "x".repeat(300), "3. c", "4. d", "5. e", "6. f"], 280),
    ["gz mate", "5.5 is faster though", "c", "d", "e"],
  );
  assert.throws(() => normalizeCandidates(["", "x".repeat(300)], 280), /no usable tweet/);
});

test("prompt carries the voice guide and switches between replies and posts", () => {
  const base = { v: 1 as const, id: "t", op: "tweet.generate" as const, locale: "en-US", topic: undefined, replyTo: undefined, maxChars: 160, timeoutMs: 1000 };
  const reply = buildTweetContext({ ...base, replyTo: "just crossed 100 users" });
  assert.match(reply.systemPrompt ?? "", /# Voice/);
  assert.match(reply.systemPrompt ?? "", /Write the replies to the source tweet/);
  assert.match(buildTweetContext({ ...base, topic: "Twitter" }).systemPrompt ?? "", /standalone posts/);
});
