import { testViewer } from '@ultil/fixtures/delytour';
import { expect } from '@playwright/test';

testViewer(
  'Login successfully', 
  { annotation: [{ type: 'id', description: 'T0001' }] },
  async ({ delyTour }) => {
    await delyTour.homePage.clickLoginButton();
    await delyTour.loginPage.login();
    await expect(delyTour.homePage.profileButton).toBeVisible();
  },
);

testViewer(
  'Login with incorrect mail', 
  { annotation: [{ type: 'id', description: 'T0003' }] },
  async ({ delyTour }) => {
    await delyTour.homePage.clickLoginButton();
    await delyTour.loginPage.loginWithIncorrectMail();
    await expect(delyTour.loginPage.incorrectEmailMessage).toBeVisible();
  },
);

testViewer(
  'Toggle password visibility', 
  { annotation: [{ type: 'id', description: 'T0004' }] },
  async ({ delyTour }) => {
    await delyTour.homePage.clickLoginButton();
    await delyTour.loginPage.togglePasswordVisibility();
    await expect(delyTour.loginPage.passwordInput).toHaveAttribute('type', 'text');
  },
);

testViewer(
  'Click forgot password link', 
  { annotation: [{ type: 'id', description: 'T0005' }] },
  async ({ delyTour }) => {
    await delyTour.homePage.clickLoginButton();
    await delyTour.loginPage.clickForgotPasswordLink();
    await expect(delyTour.loginPage.textForgotPassword).toBeVisible();
  },
);

testViewer(
  'Click signup link', 
  { annotation: [{ type: 'id', description: 'T0006' }] },
  async ({ delyTour }) => {
    await delyTour.homePage.clickLoginButton();
    await delyTour.loginPage.clickSignupLink();
    await expect(delyTour.loginPage.textSignup).toBeVisible();
  },
);