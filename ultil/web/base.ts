import { Page, selectors, TestInfo, BrowserContext, test } from '@playwright/test';
export default abstract class BasePage {
    protected constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
        public readonly baseUrl: string,
    ) {
        this.testInfo = testInfo;
        this.page = page;
        this.browser = browser;
        this.baseUrl = baseUrl;
        selectors.setTestIdAttribute('id');
    }
    async accessURL(url: string, timeout: number = 30000): Promise<void> {
        await test.step(`Access URL: ${url}`, async () => {
            try {
                await this.page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: timeout,
                });
                await this.page
                    .waitForLoadState('networkidle', {
                        timeout: Math.min(10000, timeout / 3),
                    })
                    .catch(() => {
                        const networkIdleTimeout = Math.min(10000, timeout / 3);
                        console.log(
                            `Network idle timeout (${networkIdleTimeout}ms) - continuing anyway`,
                        );
                    });
            } catch (error) {
                console.error(`Failed to access URL ${url}:`, error);
                throw error;
            }
        });
    }

    async accessBaseUrl(): Promise<void> {
        await this.accessURL(this.baseUrl);
    }
}