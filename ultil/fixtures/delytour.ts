import { test } from "@playwright/test";
import DelyTourWrapper from "@ultil/web/pages/delytour-page/delytour-wrapper";

export interface DelyTourFixtures {
    delyTour: DelyTourWrapper;
}

export const testBase = test.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await use(delyTour);
  },
});

export const testViewer = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.accessBaseUrl();
    await delyTour.homePage.clickLanguageButton();
    await use(delyTour);
  },
});

export const testwithLogin = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.accessBaseUrl();
    await delyTour.homePage.clickLanguageButton();
    await delyTour.loginPage.login();
    await use(delyTour);
  },
});

export const testwithAdminLogin = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.accessBaseUrl();
    await delyTour.homePage.clickLanguageButton();
    await delyTour.adminLoginPage.login();
    await use(delyTour);
  },
});