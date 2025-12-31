import { testViewerEn } from '@ultil/fixtures/delytour';
import { expect } from '@playwright/test';

testViewerEn.only(
    'Verify the system shows the content of about page correctly', 
    { annotation: [{ type: 'id', description: 'T0001' }] },
    async ({ delyTour }) => {
        await delyTour.homePage.clickAboutLink();
        await delyTour.aboutPage.titleIsVisible();
        await expect(delyTour.aboutPage.title).toHaveText('Giới thiệu về delytour web');
    },
);
