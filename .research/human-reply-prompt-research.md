# Human X reply prompt research

## Problem

The previous helper prompt asked for a short tweet but did not define what a reply should do. With one source tweet and a vague tone label, the model defaulted to safe assistant behavior: praise, restating, generic advice, and polished sentence templates.

## Findings

- OpenAI's prompting guidance recommends clear sections for identity, instructions, examples, and context, with delimiters/XML-style boundaries for input data. It also recommends few-shot examples for desired output shape.
- OpenAI guidance on response length says to use exact length/shape constraints, consistent few-shot lengths, token caps, and GPT-5 low verbosity/minimal reasoning for terse UX.
- Research on generic AI replies points to weak context as the root cause. With only one tweet and vague instruction, models drift toward agreeable, broad, polished, low-risk replies. Better prompts ask what the tweet is really saying and whether to agree, extend, challenge, reframe, or ask a follow-up.
- AI-writing tell lists repeatedly flag em dashes, hollow praise, safe vocabulary, overly smooth phrasing, generic encouragement, and too-perfect structure.
- Twitter reply advice converges on: concise, specific, match thread energy, add value instead of agreement, ask sharp follow-ups, add a fresh angle, and avoid clutter.

## Design changes

- Split reply vs standalone tweet behavior.
- Replies now target 3-14 words, hard ceiling 160 chars.
- Standalone posts now target 6-24 words, hard ceiling 220 chars.
- Tone selector is a light angle, not a roleplay persona.
- Hard-banned common AI tells: praise openers, em/en dashes, semicolons, hashtags, emojis, labels, summaries, essays, calls to action.
- Added explicit instruction: do not restate the source tweet; add one small new thing.
- Added missing-context handling: if asked to choose A/B but options are not available, do not pretend to see them; give a compact decision rule.
- Added few-shot examples matching the desired cadence.
- Lowered model max tokens from 220 to 70 for replies / 100 for standalone.
- Defaulted TweetGPT signature off; if enabled, uses a hyphen not an em dash.
- Added normalizer cleanup for common AI openers and em/en dashes as a safety net.

## Example target shape

Source:
> currently working on the landing page for my new tool. which one should i choose, A or B?

Reply:
> hard to tell blind, but pick the one a tired stranger gets first

Source:
> should i add more features before launch?

Reply:
> probably fewer features and a sharper promise

Source:
> ai is going to replace designers

Reply:
> only the ones who stop having taste
