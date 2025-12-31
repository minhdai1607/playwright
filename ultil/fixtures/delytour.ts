import { test } from "@playwright/test";
import DelyTourWrapper from "@ultil/web/pages/delytour-page/delytour-wrapper";
import testUrls from "@ultil/environment/config";

export interface DelyTourFixtures {
    delyTour: DelyTourWrapper;
}

export const testBase = test.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await use(delyTour);
  },
});

export const testViewerEn = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.accessBaseUrl();
    await delyTour.homePage.clickLanguageButton();
    await use(delyTour);
    // const viewport = page.viewportSize(); we can use if else to decide step for mobile or desktop
  },
});
export const testwithLoginEn = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.clickLanguageButton();
    await delyTour.loginPage.login();
    await use(delyTour);
  },
});
export const testwithLoginVi = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.loginPage.login();
    await use(delyTour);
  },
});
export const testwithAdminLogin = testBase.extend<DelyTourFixtures>({
  delyTour: async ({ page, context }, use, testInfo) => {
    const delyTour = new DelyTourWrapper(page, context, testInfo);
    await delyTour.homePage.accessURL(testUrls.TEST_URLS.delyTour+"/admin/login");
    await delyTour.adminLoginPage.login();
    await use(delyTour);
  },
});