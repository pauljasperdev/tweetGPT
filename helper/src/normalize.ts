import { HelperError } from "./errors.js";

function stripLeadingLabel(text: string): string {
  return text
    .replace(/^(?:[-*•]\s*|\d+[.)]\s+)+/u, "")
    .trim()
    .replace(/^(?:tweet|reply|response|answer)\s*[:：]\s*/iu, "")
    .trim();
}

function stripGenericAiOpener(text: string): string {
  let result = text.trim();

  for (let i = 0; i < 3; i += 1) {
    const before = result;
    result = result
      .replace(/^(?:great|nice|good|awesome|amazing)\s+(?:job|work|point|question|call|progress)(?:[^.!?]{0,80})?[.!?]\s*/iu, "")
      .replace(/^(?:love this|absolutely|totally|well said|good question|great question|interesting question)[.!?,\s]+/iu, "")
      .replace(/^(?:i think|honestly|to be honest|in my opinion|imo)[,\s]+/iu, "")
      .trim();
    if (result === before) break;
  }

  return stripLeadingLabel(result);
}

function removeAiPunctuation(text: string): string {
  return text
    .replace(/\s*[—–]\s*/gu, ", ")
    .replace(/\s{2,}/gu, " ")
    .replace(/\s+,/gu, ",")
    .replace(/,\s*([.!?])/gu, "$1")
    .trim();
}

// Quotes around the whole text are wrappers; quotes also used inside it belong to quoted phrases.
function hasInnerQuote(inner: string, open: string, close: string): boolean {
  const withoutApostrophes = inner.replace(/(?<=\p{L})['’](?=\p{L})/gu, "");
  return withoutApostrophes.includes(open) || withoutApostrophes.includes(close);
}

export function normalizeTweetText(raw: string, maxChars: number): string {
  let text = raw.trim();

  text = text.replace(/^```(?:\w+)?\s*/u, "").replace(/\s*```$/u, "").trim();
  text = text.replace(/`+/gu, "").trim();
  text = text.replace(/[\r\n\t]+/gu, " ").replace(/\s{2,}/gu, " ").trim();
  text = stripGenericAiOpener(stripLeadingLabel(text));

  const quotePairs: Array<[string, string]> = [
    ['"', '"'],
    ["'", "'"],
    ["“", "”"],
    ["‘", "’"],
    ["«", "»"],
  ];
  for (const [open, close] of quotePairs) {
    if (text.startsWith(open) && text.endsWith(close) && text.length >= open.length + close.length) {
      const inner = text.slice(open.length, text.length - close.length);
      if (hasInnerQuote(inner, open, close)) break;
      text = stripGenericAiOpener(stripLeadingLabel(inner.trim()));
      break;
    }
  }

  text = text.replace(/\s*[—-]\s*tweetGPT\s*$/iu, "").replace(/\s*tweetGPT\s*$/iu, "").trim();
  text = removeAiPunctuation(stripGenericAiOpener(text));

  if (!text) {
    throw new HelperError("upstream_error", "model returned empty tweet", 502);
  }
  if (text.length > maxChars) {
    throw new HelperError("upstream_error", "model output exceeded maxChars", 502, { length: text.length, maxChars });
  }

  return text;
}

export const MAX_CANDIDATES = 5;

export function normalizeCandidates(raw: string[], maxChars: number): string[] {
  const texts: string[] = [];
  for (const candidate of raw) {
    try {
      const text = normalizeTweetText(candidate, maxChars);
      if (!texts.includes(text)) texts.push(text);
    } catch {
      // Blank lines and over-long candidates are dropped; the rest are still usable.
    }
  }
  if (texts.length === 0) {
    throw new HelperError("upstream_error", "model returned no usable tweet", 502);
  }
  return texts.slice(0, MAX_CANDIDATES);
}
