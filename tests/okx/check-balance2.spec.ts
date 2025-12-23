import { expect } from '@playwright/test';
import { okxpage } from '@ultil/fixtures/okx';
import { readWalletAddresses } from '@ultil/common.ts';

const wallets1 = readWalletAddresses('wallet1');

for (const wallet1 of wallets1) {
    okxpage(
        `Check balance of wallet mot ${wallet1}`,
        { annotation: [{ type: 'id', description: 'T0002' }] },
        async ({ okx }) => {
            await okx.okxPortfolioPage.verifyBalanceOfWallet(wallet1);
            await expect(okx.okxPortfolioPage.noRecordsFoundText).toHaveText('No records found in the last 90 days');
        }
    );
}