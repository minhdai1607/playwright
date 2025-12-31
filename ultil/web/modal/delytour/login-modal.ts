import { type Locator, type Page } from '@playwright/test';
import BaseModal from '@ultil/web/base-modal.ts';

export default class PortfolioModal extends BaseModal {
    public readonly firstIframeTest: Locator;
    public readonly lastIframeTest: Locator;
    public readonly anyIframeTest: Locator;
    constructor(page: Page) {
        super(page);
        this.lastIframeTest = this.lastLocator.getByText('First Iframe Test').first();
        this.firstIframeTest = this.firstLocator.getByText('Last Iframe Test').first();
        this.anyIframeTest = this.middleLocator.getByText('Any Iframe Test').first();
    }
    async waitForLoginModal(): Promise<void> {
        await this.firstIframeTest.waitFor({ state: 'visible' });
    }
}