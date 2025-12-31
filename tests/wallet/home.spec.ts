import { expect } from '@playwright/test';
import { testViewer } from '@ultil/fixtures/wallet';

testViewer(
    'Verify the system shows the content of home page correctly', 
    { annotation: [{ type: 'id', description: 'T0001' }] },
    async ({ wallet }) => {
        await wallet.homePage.accessBaseUrl();
        await expect(wallet.homePage.title).toHaveText('Home');
    },
);