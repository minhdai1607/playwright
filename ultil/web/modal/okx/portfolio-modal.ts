import { type Locator, type Page } from '@playwright/test';
import BaseModal from '@ultil/web/base-modal.ts';

export default class PortfolioModal extends BaseModal {
    public readonly firstIframeTest: Locator;
    public readonly lastIframeTest: Locator;
    public readonly anyIframeTest: Locator;
    public readonly handleFrameTest: Locator;
    constructor(page: Page) {
        super(page);
        this.lastIframeTest = this.lastLocator.getByText('First Iframe Test').first();
        this.firstIframeTest = this.firstLocator.getByText('Last Iframe Test').first();
        this.anyIframeTest = this.middleLocator.getByText('Any Iframe Test').first();
        this.handleFrameTest = this.getIframeLocator(2).getByText('Handle Frame').first();
    }
    async waitforfirstIframeTest(): Promise<void> {
        await this.firstIframeTest.waitFor({ state: 'visible' });
    }
}