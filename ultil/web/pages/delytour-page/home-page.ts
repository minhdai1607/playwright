import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/config';
import { testViewerEn } from '@ultil/fixtures/delytour';

export default class HomePage extends BasePage {
    public readonly title: Locator;
    public readonly profileButton: Locator;
    public readonly loginButton: Locator;
    public readonly languageButton: Locator;
    public readonly aboutLink: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour);
        this.title = this.page.locator('h1');
        this.profileButton = this.page.getByRole('button', { name: /Hello/ });
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
        this.languageButton = this.page.locator('button', { has: this.page.locator('svg.lucide-languages') }).first();
        this.aboutLink = this.page.getByRole('link', { name: 'About' }).first();
    }
    async clickAboutLink(): Promise<void> {
        await testViewerEn.step('Click about menu', async () => {
            await this.aboutLink.click();
        });
    }
    async clickLanguageButton(): Promise<void> {
        await testViewerEn.step('Click language button on home page', async () => {
            await this.languageButton.click();
        });
    }
    async clickLoginButton(): Promise<void> {
        await testViewerEn.step('Click login button on home page', async () => {
            await this.loginButton.waitFor({ state: 'visible' });
            await this.loginButton.click();
        });
    }
    async clickProfileButton(): Promise<void> {
        await testViewerEn.step('Click profile button on home page', async () => {
            await this.profileButton.click();
        });
    }
}