import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Email input
  readonly email: Locator = this.root.locator('#email');

  // Password input
  readonly password: Locator = this.root.locator('#password');

  // Login button
  readonly login: Locator = this.root.locator('button[type="submit"]');

  // Sign Up link
  readonly signUp: Locator = this.root.locator('a[href="#signup"]');

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
    await this.signUp.waitFor({ state: 'visible' });
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible())
      return await this.errorMessage.textContent();
    return null;
  }
}
