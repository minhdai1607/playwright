import { BrowserContext, Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@ultil/web/base.ts';
import testUrls from '@ultil/environment/staging/data.ts';
import { testViewer } from '@ultil/fixtures/delytour';
import { generateTestEmail, generateRandomPhoneNumber, generateRandomBankAccountNumber, generateName } from '@ultil/common';
interface RegisterData {
    email?: string;
    password?: string;
    name?: string;
    bankAccount?: string;
}
export default class RegisterPage extends BasePage {
    public readonly title: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly confirmPasswordInput: Locator;
    public readonly registerButton: Locator;
    public readonly fullNameInput: Locator;
    public readonly phoneNumberInput: Locator;
    public readonly addressInput: Locator;
    public readonly cityInput: Locator;
    public readonly countryInput: Locator;
    public readonly bankAccountInput: Locator;
    public readonly bankNameInput: Locator;
    public readonly nextButton: Locator;
    constructor(
        public readonly page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo, testUrls.TEST_URLS.delyTour);
        this.title = this.page.getByText('Create Account');
        this.emailInput = this.page.getByPlaceholder('Enter your email');
        this.passwordInput = this.page.getByTestId('password');
        this.confirmPasswordInput = this.page.getByTestId('confirmPassword');
        this.registerButton = this.page.getByRole('button', { name: 'Next' });
        this.fullNameInput = this.page.getByPlaceholder('Enter full name');
        this.phoneNumberInput = this.page.getByPlaceholder('Enter phone number');
        this.addressInput = this.page.getByPlaceholder('House number, street, ward, district...');
        this.cityInput = this.page.getByPlaceholder('Hanoi, Ho Chi Minh...');
        this.countryInput = this.page.getByPlaceholder('Vietnam');
        this.bankAccountInput = this.page.getByPlaceholder('Enter bank account number');
        this.bankNameInput = this.page.getByPlaceholder('Example: Vietcombank - Hanoi Branch');
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
    }

    async register(data?: RegisterData): Promise<void> {
        data = data ?? {
        email: generateTestEmail(),
        password: generateRandomPhoneNumber(),
        name: generateName(),
        bankAccount: generateRandomBankAccountNumber(),
    };
        await testViewer.step('Register', async () => {
            if (!data.email) {
                data.email = generateTestEmail();
            }
            if (!data.password) {
                data.password = generateRandomPhoneNumber();
            }
            if (!data.name) {
                data.name = generateName();
            }
            if (!data.bankAccount) {
                data.bankAccount = generateRandomBankAccountNumber();
            }
            await this.title.waitFor({ state: 'visible' });
            await this.emailInput.fill(data.email);
            await this.passwordInput.fill(data.password);
            await this.confirmPasswordInput.fill(data.password);
            await this.nextButton.click();
            // modal 2
            await this.fullNameInput.fill(data.name);
            await this.phoneNumberInput.fill(data.password);
            await this.addressInput.fill('123 Main Street');
            await this.cityInput.fill('Hanoi');
            await this.countryInput.fill('Vietnam');
            await this.nextButton.click();
            // modal 3
            await this.bankAccountInput.fill(data.bankAccount);
            await this.bankNameInput.fill('Vietcombank');
            await this.registerButton.click();
        });
    }
}