import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField = 'input[name="username"]';
    readonly passwordField = 'input[name="password"]';
    readonly loginButton = 'button[type="submit"]';
    readonly errorMessage = '.error-message';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
}
