import { testViewer } from '@ultil/fixtures/delytour';
import { expect } from '@playwright/test';

testViewer(
    'Register successfully', 
    { annotation: [{ type: 'id', description: 'T0007' }] },
    async ({ delyTour }) => {
      await delyTour.homePage.clickLoginButton();
      await delyTour.loginPage.clickSignupLink();
      await delyTour.registerPage.register();
      await expect(delyTour.homePage.profileButton).toBeVisible();
    },
  );
testViewer.only(
    'Register with incorrect mail', 
    { annotation: [{ type: 'id', description: 'T0008' }] },
    async ({ delyTour }) => {
      await delyTour.homePage.clickLoginButton();
      await delyTour.loginPage.clickSignupLink();
      await delyTour.registerPage.registerWithIncorrectMail();
      await expect(delyTour.registerPage.incorrectEmailMessage).toBeVisible();
    },
);
testViewer.only(
    'Register with incorrect confirm password', 
    { annotation: [{ type: 'id', description: 'T0009' }] },
    async ({ delyTour }) => {
        await delyTour.homePage.clickLoginButton();
        await delyTour.loginPage.clickSignupLink();
        await delyTour.registerPage.registerWithIncorrectConfirmPassword();
        await expect(delyTour.registerPage.incorrectPasswordMessage).toBeVisible();
    },
);