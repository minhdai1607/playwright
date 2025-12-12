import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/staging/data.ts';

export default class AdminLoginPage extends BasePage {
    public readonly title: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour);
        this.title = this.page.locator('h1');
    }
    async login(): Promise<void> {
        await this.page.fill('input[name="email"]', 'test@example.com');
        await this.page.fill('input[name="password"]', 'password');
        await this.page.click('button[type="submit"]');
    }
}