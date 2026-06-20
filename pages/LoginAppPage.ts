import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Email input
  readonly email: Locator = this.root.locator('[name="email"]');
  
  // Password input
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login button
  readonly login: Locator = this.root.locator('button[type="submit"]');
  
  // Register link
  readonly register: Locator = this.root.locator('a[href="/register"]');

  // Error message
  readonly errorMessage: Locator = this.root.locator('[role="alert"]');

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
    await this.register.waitFor({ state: 'visible' });
  }

  async verifyError(message: string): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector('[role="alert"]');
    const errText = await this.errorMessage.textContent();
    if (errText) {
      if (!errText.includes(message)) {
        throw new Error(`Error text "${errText}" does not include "${message}"`);
      }
    }
  }
}
