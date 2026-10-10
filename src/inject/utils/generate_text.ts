import { TweetProps } from "../../shared/tweet_props";

export const generateTexts = (props: TweetProps): Promise<string[] | undefined> => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'generate_tweet', props }, response => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                resolve(undefined);
                return;
            }
            resolve(response);
        });
    });
};
