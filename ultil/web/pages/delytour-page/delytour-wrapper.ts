import {
    type Page,
    type TestInfo,
    type BrowserContext,
} from '@playwright/test';
import HomePage from './home-page.ts';
import WrapperBase from '../../wrapper.ts';
import LoginPage from './login-page.ts';
import AdminLoginPage from './admin-login-page.ts';
import RegisterPage from './register-page.ts';
export default class DelyTourWrapper extends WrapperBase {
    public readonly homePage: HomePage;
    public readonly loginPage: LoginPage;
    public readonly registerPage: RegisterPage;
    public readonly adminLoginPage: AdminLoginPage;
    constructor(
        page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo);
        this.homePage = new HomePage(page, browser, testInfo);
        this.loginPage = new LoginPage(page, browser, testInfo);
        this.registerPage = new RegisterPage(page, browser, testInfo);
        this.adminLoginPage = new AdminLoginPage(page, browser, testInfo);
    }
}