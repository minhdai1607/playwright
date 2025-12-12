import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/staging/data.ts';
import { testViewer } from '@ultil/fixtures/delytour';
export default class LoginPage extends BasePage {
    public readonly title: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly rememberMeCheckbox: Locator;
    public readonly forgotPasswordLink: Locator;
    public readonly signupLink: Locator;
    public readonly eyeButton: Locator;
    public readonly errorMessage: Locator;
    public readonly incorrectEmailMessage: Locator;
    public readonly textForgotPassword: Locator;
    public readonly textSignup: Locator;
    
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour);
        
        // Text elements
        this.title = this.page.getByText('Welcome back to DelyTour!');
        
        // Input fields
        this.emailInput = this.page.getByPlaceholder('Enter your email');
        this.passwordInput = this.page.getByPlaceholder('Enter password');
        
        // Buttons - dùng getByRole cho buttons
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.eyeButton = this.page.locator('button', { has: this.page.locator('svg.lucide-eye, svg.lucide-eye-off') });
        
        // Checkbox và Links - dùng getByRole
        this.rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'Remember me' });
        this.forgotPasswordLink = this.page.getByRole('link', { name: 'Forgot password?' });
        this.signupLink = this.page.getByRole('link', { name: 'Sign up' });
        
        // Error/Status messages - dùng getByText
        this.errorMessage = this.page.getByText('Invalid email or password');
        this.incorrectEmailMessage = this.page.getByText('Invalid email');
        this.textForgotPassword = this.page.getByText('Forgot Password?');
        this.textSignup = this.page.getByText('Create Account');

    }
    async login(): Promise<void> {
        await testViewer.step('Login', async () => {
            await this.title.waitFor({ state: 'visible' });
            await this.emailInput.fill(testUrls.mailinatorUsers[1].email);
            await this.passwordInput.fill(testUrls.mailinatorUsers[1].password);
            await this.loginButton.click();
        });
    }
    async loginWithIncorrectAccount(): Promise<void> {
        await testViewer.step('Login with incorrect account', async () => {
            await this.title.waitFor({ state: 'visible' });
            await this.emailInput.fill(testUrls.mailinatorUsers[3].email);
            await this.passwordInput.fill(testUrls.mailinatorUsers[3].password);
            await this.loginButton.click();
        });
    }
    async loginWithIncorrectMail(): Promise<void> {
        await testViewer.step('Login with incorrect mailinator account', async () => {
            await this.title.waitFor({ state: 'visible' });
            await this.emailInput.fill(testUrls.mailinatorUsers[0].email);
            await this.passwordInput.fill(testUrls.mailinatorUsers[0].password);
            await this.loginButton.click();
        });
    }
    async togglePasswordVisibility(): Promise<void> {
        await testViewer.step('Toggle password visibility', async () => {
            await this.eyeButton.click();
        });
    }
    async clickForgotPasswordLink(): Promise<void> {
        await testViewer.step('Click forgot password link', async () => {
            await this.forgotPasswordLink.click();
        });
    }
    async clickSignupLink(): Promise<void> {
        await testViewer.step('Click signup link', async () => {
            await this.signupLink.click();
        });
    }
}