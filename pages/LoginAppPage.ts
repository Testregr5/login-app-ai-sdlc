import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Email input
  readonly email: Locator = this.root.locator('[name="email"]');

  // Password input
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login button
  readonly login: Locator = this.root.locator('button');

  // Message area (error/success)
  readonly message: Locator = this.root.locator('#message');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async performLogin(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.email.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
  }

  async getMessageText(): Promise<string> {
    return await this.message.textContent() || '';
  }
}
