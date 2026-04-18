import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Email input
  readonly emailInput: Locator = this.root.locator('[name="email"]');

  // Password input
  readonly passwordInput: Locator = this.root.locator('[name="password"]');

  // Submit button
  readonly submitButton: Locator = this.root.locator('button[type="submit"]');

  // Error message
  readonly errorMessage: Locator = this.root.locator('.alert-danger');

  // Register link
  readonly registerLink: Locator = this.root.locator('a[href="/register"]');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.submitButton.waitFor({ state: 'visible' });
    await this.registerLink.waitFor({ state: 'visible' });
  }

  async verifyLoginError(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
  }
}
