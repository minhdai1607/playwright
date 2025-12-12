import process from 'node:process';

import {
    type Page,
    type TestInfo,
    type BrowserContext,
    type Response,
    test,
} from '@playwright/test';


export default class WrapperBase {
    private readonly contextPage: Page;

    constructor(
        page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        this.contextPage = page;
    }

    /**
     * Overrides the browser's native `window.prompt` behavior based on execution mode.
     *
     * In headless mode (when `BROWSER_HEADED !== 'true'`), it injects a mock implementation of
     * `window.prompt` into the page to automatically return the provided content.
     *
     * In headed mode, it waits for the actual `prompt` dialog and programmatically accepts it
     * with the given content.
     *
     * @param {string} content - The string to be returned to or accepted in the prompt dialog.
     * @returns {Promise<void>} A promise that resolves after the prompt is handled.
     */
    async handlePromptDialog(content: string): Promise<void> {
        await test.step(`Handle prompt with input: "${content}"`, async () => {
            if (process.env.BROWSER_HEADED !== 'true') {
                await this.page.evaluate((returnValue) => {
                    window.prompt = () => returnValue;
                }, content);
            } else {
                this.page.once('dialog', (dialog) => dialog.accept(content));
            }
        });
    }

    /**
     * Wait for API response with specified parameters
     * @param options - Options for waiting API response
     * @param options.url - URL pattern to match with request (can be string or RegExp)
     * @param options.statusCode - Expected status code (default is 200)
     * @param options.timeout - Timeout to wait for response (default is 30000ms)
     * @param options.method - HTTP method to match (GET, POST, PUT, DELETE, etc.)
     * @param options.action - Function to execute to trigger API call
     * @returns Promise<Response> - Response object from API
     */
    async waitForApiResponse(options: {
        url: string | RegExp;
        statusCode?: number;
        timeout?: number;
        method?: string;
        action: () => Promise<void> | void;
    }): Promise<Response> {
        const {
            url,
            statusCode = 200,
            timeout = 80000,
            method,
            action,
        } = options;
        return await test.step(`Wait for API response: ${url}`, async () => {
            const responsePromise = this.page.waitForResponse(
                (response) => {
                    const urlMatches =
                        typeof url === 'string'
                            ? response.url().includes(url)
                            : url.test(response.url());

                    const statusMatches = response.status() === statusCode;
                    const methodMatches = method
                        ? response.request().method() === method
                        : true;

                    return urlMatches && statusMatches && methodMatches;
                },
                { timeout },
            );
            await action();
            const response = await responsePromise;
            console.log(
                `API Response received: ${response.url()} - Status: ${response.status()}`,
            );
            return response;
        });
    }

    public get page(): Page {
        return this.contextPage;
    }

    async reloadPage(): Promise<void> {
        await test.step('Reload Page', async () => {
            await this.page.reload();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }
}
