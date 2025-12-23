import { test } from "@playwright/test";
import OkxWrapper from "@ultil/web/pages/okx-page/okx-wrapper";
export interface OkxFixtures {
    okx: OkxWrapper;
}
export const okxpage = test.extend<OkxFixtures>({
    okx: async ({ page, context }, use, testInfo) => {
        const okx = new OkxWrapper(page, context, testInfo);
        await okx.okxPortfolioPage.accessBaseUrl();
        await use(okx);
    },
});