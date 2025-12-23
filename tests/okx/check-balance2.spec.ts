import { expect } from '@playwright/test';
import { okxpage } from '@ultil/fixtures/okx';
import { readWalletAddresses } from '@ultil/common.ts';

const wallets2 = readWalletAddresses('wallet2');

for (const wallet2 of wallets2) {
    okxpage(
        `Check balance of wallet mot ${wallet2}`,
        { annotation: [{ type: 'id', description: 'T0002' }] },
        async ({ okx }) => {
            await okx.okxPortfolioPage.verifyBalanceOfWallet(wallet2);
            await expect(okx.okxPortfolioPage.noRecordsFoundText).toHaveText('No records found in the last 90 days');
        }
    );
}