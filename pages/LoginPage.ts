import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Username input
  readonly username: Locator = this.root.locator('[name="username"]');

  // Password input
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login button
  readonly login: Locator = this.root.locator('button[type="submit"]');

  // Error message
  readonly errorMsg: Locator = this.root.locator('[aria-live="polite"]');

  // "Forgot Password?" link
  readonly forgotPassword: Locator = this.root.locator('a[href="#/forgot-password"]');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async loginWith(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
    await this.forgotPassword.waitFor({ state: 'visible' });
  }
}
