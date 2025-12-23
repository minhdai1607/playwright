import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/staging/data.ts';
import { okxpage } from '@ultil/fixtures/okx';

export default class OkxPortfolioPage extends BasePage {
    public readonly otherText: Locator;
    public readonly noRecordsFoundText: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.OkxPortfolioPage);
        this.otherText = this.page.getByText('Other').first();
        this.noRecordsFoundText = this.page.getByText('No records found in the last 90 days').first();
    }
    async verifyBalanceOfWallet(walletAddress: string): Promise<void> {
        okxpage.step(`Verify balance of wallet ${walletAddress}`, async () => {
            await this.accessURL(
                testUrls.TEST_URLS.OkxPortfolioPage +'portfolio/'+ walletAddress + '/history'
            );
            await this.otherText.waitFor({ state: 'visible' });
            await this.otherText.click();
            await this.noRecordsFoundText.waitFor({ state: 'visible' });
        });
    }
}