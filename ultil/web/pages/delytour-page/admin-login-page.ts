import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/config';
import { testwithAdminLogin } from '@ultil/fixtures/delytour';

export default class AdminLoginPage extends BasePage {
    public readonly title: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour+"/admin/login");
        this.title = this.page.locator('h1');
        this.emailInput = this.page.getByPlaceholder('Enter your email');
        this.passwordInput = this.page.getByPlaceholder('Enter password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }
    async login(): Promise<void> {
        await testwithAdminLogin.step('Login on admin page', async () => {
            await this.title.waitFor({ state: 'visible' });
            await this.emailInput.fill(testUrls.mailinatorUsers[2].email);
            await this.passwordInput.fill(testUrls.mailinatorUsers[2].password);
            await this.loginButton.click();
        });
    }
}