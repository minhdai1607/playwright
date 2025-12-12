import { BrowserContext, Page, TestInfo } from "@playwright/test";
import HomePage from "./home-page";
import WrapperBase from "../../wrapper";

export default class WalletWrapper extends WrapperBase {
    public readonly homePage: HomePage;
    constructor(
        page: Page,
        public readonly browser: BrowserContext,
        public readonly testInfo: TestInfo,
    ) {
        super(page, browser, testInfo);
        this.homePage = new HomePage(page, browser, testInfo);
    }
}