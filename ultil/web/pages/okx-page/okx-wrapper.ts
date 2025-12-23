import {
    type Page,
    type TestInfo,
    type BrowserContext,
} from '@playwright/test';
import WrapperBase from '../../wrapper.ts';
import OkxPortfolioPage from './okx-portfolio-page.ts';
export default class OkxWrapper extends WrapperBase {
    public readonly okxPortfolioPage: OkxPortfolioPage;
    constructor(
        page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo);
        this.okxPortfolioPage = new OkxPortfolioPage(page, browser, testInfo);
    }
}