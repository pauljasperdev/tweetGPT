import { LocalHelperClient } from './local_helper_client';
import { STORAGE_KEYS } from '../shared/storage_keys';
import { TweetProps } from '../shared/tweet_props';

const xMatches = ['https://twitter.com/*', 'https://x.com/*'];
const allowedOrigins = new Set(['https://twitter.com', 'https://x.com']);

chrome.scripting.registerContentScripts([
    {
        id: `main_context_inject_${Math.random()}`,
        world: 'ISOLATED',
        matches: xMatches,
        js: ['lib/inject.js'],
        css: ['css/inject.css'],
    },
]);

const helperClient = new LocalHelperClient();

type GenerateTweetMessage = {
    type: 'generate_tweet';
    props: TweetProps;
};

type HelperHealthMessage = {
    type: 'helper_health_check';
};

type Message = GenerateTweetMessage | HelperHealthMessage;

const isAllowedSender = (sender: chrome.runtime.MessageSender): boolean => {
    if (!sender.tab?.url) return true;

    try {
        return allowedOrigins.has(new URL(sender.tab.url).origin);
    } catch {
        return false;
    }
};

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (!message?.type) {
        return false;
    }

    switch (message.type) {
        case 'generate_tweet':
            void (async () => {
                if (!isAllowedSender(sender)) {
                    sendResponse(undefined);
                    return;
                }

                const savedSettings = await chrome.storage.local.get(STORAGE_KEYS.isAddSignature);
                const isAddSignature = savedSettings[STORAGE_KEYS.isAddSignature] ?? false;
                const isReply = Boolean(message.props.replyTo?.trim());
                const naturalMaxChars = isReply ? 160 : 220;
                const signature = ' - tweetGPT';
                const maxChars = isAddSignature ? Math.min(naturalMaxChars, 280 - signature.length) : naturalMaxChars;
                const texts = await helperClient.generateTweets(message.props, { maxChars });
                sendResponse(isAddSignature ? texts?.map((text) => `${text}${signature}`) : texts);
            })().catch((error) => {
                console.error(error);
                sendResponse(undefined);
            });
            return true;

        case 'helper_health_check':
            void helperClient.checkConnection().then(sendResponse, (error) => {
                console.error(error);
                sendResponse({ reachable: false, message: 'Helper check failed.' });
            });
            return true;
    }

    return false;
});
