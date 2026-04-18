import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Login Page.
 * Generated for EPMCDMETST-39332
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Username"], input[name="username"]');
    this.passwordInput = page.locator('input[placeholder="Password"], input[name="password"]');
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login")');
    this.errorBanner = page.locator('.error, .alert-danger, [data-testid="error-message"]');
  }

  async goto() {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
