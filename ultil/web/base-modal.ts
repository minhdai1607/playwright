import { type Page, selectors } from '@playwright/test';

import type { FrameLocator, Locator } from '@playwright/test';

export default abstract class BasePage {
    public readonly firstLocator: FrameLocator;
    public readonly lastLocator: FrameLocator;
    public readonly middleLocator: FrameLocator;
    protected constructor(public readonly page: Page) {
        this.page = page;
        this.firstLocator = this.page.locator('iframe').first().contentFrame();
        this.lastLocator = this.page.locator('iframe').last().contentFrame();
        this.middleLocator = this.getIframeLocator();
        selectors.setTestIdAttribute('id');
    }

    getIframeLocator(index: number = 1): FrameLocator {
        return this.page.locator('iframe').nth(index).contentFrame();
    }

    async waitForElementVisible(
        locator: Locator,
        timeout: number = 30000,
    ): Promise<void> {
        await locator.waitFor({
            state: 'visible',
            timeout: timeout,
        });
    }

    async closeModal(): Promise<void> {
        const closeButton = this.lastLocator.getByRole('button');
        await this.waitForElementVisible(closeButton);
        await closeButton.click();
    }

    async getAllIframes(): Promise<Locator[]> {
        return this.page.locator('iframe').all();
    }

    async getAllFrameLocators(): Promise<FrameLocator[]> {
        const allIframes = await this.getAllIframes();
        const frameLocators: FrameLocator[] = [];
        for (const iframeLocator of allIframes) {
            frameLocators.push(iframeLocator.contentFrame());
        }
        return frameLocators;
    }
}
