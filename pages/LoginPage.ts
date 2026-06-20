import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page!: Page;
  readonly root!: Locator;

  readonly username: Locator = this.root.locator('#username');
  readonly password: Locator = this.root.locator('#password');
  readonly login: Locator = this.root.locator('button[type="submit"]');
  readonly errorMessage: Locator = this.root.locator('[data-testid="error"]');
  readonly togglePassword: Locator = this.root.locator('[aria-label="Show password"]');
  readonly title: Locator = this.root.locator('h2');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
    await this.title.waitFor({ state: 'visible' });
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.togglePassword.waitFor({ state: 'visible' });
    await this.togglePassword.click();
  }

  async expectError(message: string): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
    await this.page.waitForSelector(`[data-testid="error"]:has-text("${message}")`);
  }
}
