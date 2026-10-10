export const HELPER_PROTOCOL_VERSION = 1 as const;
export const HELPER_GENERATE_OP = 'tweet.generate' as const;
export const HELPER_BASE_URL = 'http://127.0.0.1:31415';

export type GenerateTweetRequest = {
    v: typeof HELPER_PROTOCOL_VERSION;
    id: string;
    op: typeof HELPER_GENERATE_OP;
    locale: string;
    topic?: string;
    replyTo?: string;
    maxChars: number;
    timeoutMs: number;
};

export type UsageSummary = {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    totalTokens: number;
};

export type GenerateTweetSuccess = {
    ok: true;
    v: typeof HELPER_PROTOCOL_VERSION;
    id: string;
    texts: string[];
    model: string;
    usage?: UsageSummary;
};

export type HelperErrorCode =
    | 'forbidden'
    | 'bad_request'
    | 'auth_missing'
    | 'model_missing'
    | 'timeout'
    | 'upstream_error'
    | 'method_not_allowed'
    | 'not_found'
    | 'payload_too_large'
    | 'internal_error';

export type GenerateTweetError = {
    ok: false;
    v: typeof HELPER_PROTOCOL_VERSION;
    id?: string;
    error: {
        code: HelperErrorCode;
        message: string;
        details?: unknown;
    };
};

export type GenerateTweetResponse = GenerateTweetSuccess | GenerateTweetError;

export type HealthResponse = {
    ok: true;
    v: typeof HELPER_PROTOCOL_VERSION;
    name: 'tweetgpt-local-helper';
    mode: 'mock' | 'real';
    provider: 'openai-codex';
    model: string;
    auth: {
        configured: boolean;
        source?: string;
    };
};

export type HelperConnectionStatus = {
    reachable: boolean;
    authConfigured?: boolean;
    mode?: 'mock' | 'real';
    model?: string;
    message: string;
};
