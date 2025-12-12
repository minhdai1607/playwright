import { test } from "@playwright/test";
import WalletWrapper from "@ultil/web/pages/wallet-page/wallet-wrapper";

export interface WalletFixtures {
    wallet: WalletWrapper;
}

// Base test với fixture wallet
export const testBase = test.extend<WalletFixtures>({
  wallet: async ({ page, context }, use, testInfo) => {
    const wallet = new WalletWrapper(page, context, testInfo);
    await use(wallet);
  },
});

// Test với viewer (chỉ access base URL)
export const testViewer = testBase.extend<WalletFixtures>({
  wallet: async ({ page, context }, use, testInfo) => {
    const wallet = new WalletWrapper(page, context, testInfo);
    await wallet.homePage.accessBaseUrl();
    await use(wallet);
  },
});