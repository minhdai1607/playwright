import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/config';
import { testViewerEn } from '@ultil/fixtures/delytour';

export default class AboutPage extends BasePage {
    public readonly title: Locator;
    public readonly aboutLink: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour);
        this.title = this.page.getByText('Giới thiệu về delytour web').first();
        this.aboutLink = this.page.getByRole('link', { name: 'About' });
    }
    
    async titleIsVisible(): Promise<void> {
        await testViewerEn.step('Access about page', async () => {
            await this.title.waitFor({ state: 'visible' });
        });
    }
}