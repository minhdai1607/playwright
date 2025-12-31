import { expect } from '@playwright/test';
import { okxpage } from '@ultil/fixtures/okx';
import { readWalletAddresses } from '@ultil/common.ts';

const wallets = readWalletAddresses('wallet');
for (const wallet of wallets) {
    okxpage(
        `Check balance of wallet ${wallet}`,
        { annotation: [{ type: 'id', description: 'T0001' }] },
        async ({ okx }) => {
            await okx.okxPortfolioPage.verifyBalanceOfWallet(wallet);
            await expect(okx.okxPortfolioPage.noRecordsFoundText).toHaveText('No records found in the last 90 days');
        }
    );
}
