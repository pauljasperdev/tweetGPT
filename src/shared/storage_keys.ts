export const STORAGE_KEYS = {
    language: 'language',
    isAddSignature: 'isAddSignature',
    isAddTopicForReplies: 'isAddTopicForReplies',
    lastTopic: 'lastTopic',
} as const;

export type StoredSettings = {
    language?: string;
    isAddSignature?: boolean;
    isAddTopicForReplies?: boolean;
    lastTopic?: string;
};
