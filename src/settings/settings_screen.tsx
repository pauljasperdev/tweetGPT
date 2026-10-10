import * as React from 'react';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { Body, Container, Logo, SettingsBlock } from './settings_screen.styled';
import { Checkbox } from './components/checkbox';
import { Selector, languageOption } from './components/selector';
import { H1, H2, Subtitle } from './components/text';
import { Space } from './components/space';
import { locales, defaultLocale } from '../shared/locales';
import { LEGACY_OPENAI_TOKEN_KEY } from '../shared/legacy_storage_keys';
import { STORAGE_KEYS, StoredSettings } from '../shared/storage_keys';
import { HELPER_BASE_URL, HelperConnectionStatus } from '../shared/helper_protocol';

const sendHelperHealthCheck = (): Promise<HelperConnectionStatus> => {
    return new Promise((resolve) => {
        let settled = false;
        const finish = (status: HelperConnectionStatus) => {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            resolve(status);
        };
        const timeout = setTimeout(() => {
            finish({ reachable: false, message: 'Helper check timed out. Reload the extension from chrome://extensions and try again.' });
        }, 45000);

        chrome.runtime.sendMessage({ type: 'helper_health_check' }, response => {
            if (chrome.runtime.lastError) {
                finish({ reachable: false, message: `${chrome.runtime.lastError.message ?? 'Helper check failed.'} Reload the extension from chrome://extensions and try again.` });
                return;
            }
            finish(response ?? { reachable: false, message: 'Helper check failed. Reload the extension from chrome://extensions and try again.' });
        });
    });
};

export const SettingsScreen = () => {
    const logoPath = useMemo(() => chrome.runtime.getURL('icons/128.png'), []);
    const [helperStatus, setHelperStatus] = useState<HelperConnectionStatus | undefined>();
    const [isTestingHelper, setTestingHelper] = useState(false);
    const [selectedLanguage, setLanguage] = useState(defaultLocale);
    const [isAddSignature, setAddSignature] = useState(false);
    const [isAddTopicForReplies, setTopicForReplies] = useState(false);

    const changeSignature = useCallback(async (isNewAddSignature: boolean) => {
        await chrome.storage.local.set({ [STORAGE_KEYS.isAddSignature]: isNewAddSignature });
        setAddSignature(isNewAddSignature);
    }, []);

    const changeTopic = useCallback(async (isAddTopicForReplies: boolean) => {
        await chrome.storage.local.set({ [STORAGE_KEYS.isAddTopicForReplies]: isAddTopicForReplies });
        setTopicForReplies(isAddTopicForReplies);
    }, []);

    const changeLanguage = useCallback(async (language: string) => {
        await chrome.storage.local.set({ [STORAGE_KEYS.language]: language });
        setLanguage(language);
    }, []);

    const testHelperConnection = useCallback(async () => {
        if (isTestingHelper) return;
        setTestingHelper(true);
        setHelperStatus({ reachable: false, message: 'Testing helper connection...' });
        try {
            const status = await sendHelperHealthCheck();
            setHelperStatus(status);
        } finally {
            setTestingHelper(false);
        }
    }, [isTestingHelper]);

    useEffect(() => {
        chrome.storage.local.remove(LEGACY_OPENAI_TOKEN_KEY);
        chrome.storage.local.get<StoredSettings>([
            STORAGE_KEYS.language,
            STORAGE_KEYS.isAddSignature,
            STORAGE_KEYS.isAddTopicForReplies,
        ]).then((state) => {
            if (state.language) {
                setLanguage(state.language);
            }
            if (state.isAddSignature != null) {
                setAddSignature(state.isAddSignature);
            }
            if (state.isAddTopicForReplies != null) {
                setTopicForReplies(state.isAddTopicForReplies);
            }
        });
    }, []);

    const languageOptions: languageOption[] = useMemo(() =>{
        const codes = Object.keys(locales);

        return codes.map(code => ({
            value: code,
            label: locales[code][0]
        }));
    }, []);

    return (
        <Body>
            <Logo src={logoPath} />
            <Container>
                <H1>TweetGPT Settings</H1>
                <SettingsBlock>
                    <H2>Local Helper</H2>
                    <Space height={3} />
                    <Subtitle>TweetGPT talks to a local helper at {HELPER_BASE_URL}. The helper owns Codex/ChatGPT subscription auth; nothing needs to be configured here.</Subtitle>
                    <Space height={10} />
                    <button onClick={testHelperConnection} disabled={isTestingHelper}>{isTestingHelper ? 'Testing helper connection...' : 'Test helper connection'}</button>
                    {helperStatus && <>
                        <Space height={10} />
                        <Subtitle>{helperStatus.message}</Subtitle>
                        {helperStatus.authConfigured === false && <Subtitle>Codex auth is not configured in the helper. Run bun run --cwd helper auth:login.</Subtitle>}
                    </>}
                </SettingsBlock>
                <SettingsBlock>
                    <H2>Local setup</H2>
                    <Space height={3} />
                    <Subtitle>Run these commands from the repository root. Login is only needed once.</Subtitle>
                    <pre>{`bun run --cwd helper auth:login
bun run --cwd helper dev`}</pre>
                </SettingsBlock>
                <SettingsBlock>
                    <H2>Text Generation</H2>
                    <Space height={10} />
                    <Checkbox value={isAddSignature} onChange={changeSignature} label='Add TweetGPT signature (less natural)' />
                    <Space height={10} />
                    <Checkbox value={isAddTopicForReplies} onChange={changeTopic} label='Ask for tweet topic in replies' />
                </SettingsBlock>
                <SettingsBlock>
                    <H2>Language</H2>
                    <Space height={10} />
                    <Selector value={selectedLanguage} onChange={changeLanguage} options={languageOptions} />
                </SettingsBlock>
            </Container>
        </Body>
    )
};
