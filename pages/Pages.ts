import { LoginPage } from './LoginPage';
import { Page } from '@playwright/test';

export class Pages {
    private page: Page;
    public loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }
}
