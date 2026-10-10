import {
    HELPER_BASE_URL,
    HELPER_GENERATE_OP,
    HELPER_PROTOCOL_VERSION,
    GenerateTweetRequest,
    GenerateTweetResponse,
    HealthResponse,
    HelperConnectionStatus,
} from '../shared/helper_protocol';
import { normalizeTweetText } from '../shared/normalize_tweet';
import { TweetProps } from '../shared/tweet_props';

export type GenerateTweetOptions = {
    maxChars: number;
    timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 30000;

const showNotification = (title: string, message: string) => {
    chrome.notifications.create(`TweetGPT:${Date.now()}`, {
        type: 'basic',
        iconUrl: './icons/32.png',
        title,
        message,
        priority: 2,
    });
};

const makeRequestId = (): string => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number): Promise<Response> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...init, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
};

const isAbortError = (error: unknown): boolean => error instanceof Error && error.name === 'AbortError';

export class LocalHelperClient {
    async generateTweets(props: TweetProps, options: GenerateTweetOptions): Promise<string[] | undefined> {
        const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
        const request: GenerateTweetRequest = {
            v: HELPER_PROTOCOL_VERSION,
            id: makeRequestId(),
            op: HELPER_GENERATE_OP,
            locale: props.locale,
            ...(props.topic && props.topic.trim() ? { topic: props.topic.trim() } : {}),
            ...(props.replyTo && props.replyTo.trim() ? { replyTo: props.replyTo.trim() } : {}),
            maxChars: options.maxChars,
            timeoutMs,
        };

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs + 5000);

        try {
            const response = await fetch(`${HELPER_BASE_URL}/v1/generate-tweet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
                signal: controller.signal,
            });
            const body = (await response.json()) as GenerateTweetResponse;

            if (!response.ok || !body.ok) {
                const message = body.ok ? `HTTP ${response.status}` : body.error.message;
                showNotification('TweetGPT generation failed', message);
                return undefined;
            }

            const texts = body.texts.flatMap((text) => normalizeTweetText(text, options.maxChars) ?? []);
            if (texts.length === 0) {
                showNotification('TweetGPT generation failed', 'Helper returned empty or over-long tweet text.');
                return undefined;
            }
            return texts;
        } catch (error) {
            const message = controller.signal.aborted
                ? 'Helper request timed out.'
                : 'Helper is not running. Start it with: bun run --cwd helper dev';
            console.error(error);
            showNotification('TweetGPT helper error', message);
            return undefined;
        } finally {
            clearTimeout(timeout);
        }
    }

    async checkConnection(): Promise<HelperConnectionStatus> {
        try {
            const healthResponse = await fetchWithTimeout(`${HELPER_BASE_URL}/health`, { method: 'GET' }, 5000);
            if (!healthResponse.ok) {
                return { reachable: false, message: `Helper health returned HTTP ${healthResponse.status}.` };
            }

            const health = (await healthResponse.json()) as HealthResponse;
            const base: HelperConnectionStatus = {
                reachable: true,
                authConfigured: health.auth.configured,
                mode: health.mode,
                model: `${health.provider}/${health.model}`,
                message: `Helper reachable (${health.mode}, ${health.provider}/${health.model}).`,
            };

            const probe = await fetchWithTimeout(`${HELPER_BASE_URL}/v1/generate-tweet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    v: HELPER_PROTOCOL_VERSION,
                    id: makeRequestId(),
                    op: HELPER_GENERATE_OP,
                    locale: 'en-US',
                    topic: 'helper connection test',
                    maxChars: 120,
                    timeoutMs: 10000,
                } satisfies GenerateTweetRequest),
            }, 15000);
            const body = (await probe.json()) as GenerateTweetResponse;

            if (probe.status === 403 || (!body.ok && body.error.code === 'forbidden')) {
                return { ...base, message: `${base.message} Helper rejected this extension (ID ${chrome.runtime.id}).` };
            }

            if (!body.ok) {
                return { ...base, message: `${base.message} Generation failed: ${body.error.message}` };
            }

            return { ...base, message: `${base.message} Test tweet generated.` };
        } catch (error) {
            console.error(error);
            return {
                reachable: false,
                message: isAbortError(error)
                    ? 'Helper check timed out.'
                    : 'Helper is not running. Start it with: bun run --cwd helper dev',
            };
        }
    }
}
