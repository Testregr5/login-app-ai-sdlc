import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Username input
  readonly username: Locator = this.root.locator('[name="username"]');

  // Password input
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login button
  readonly login: Locator = this.root.locator('button[type="submit"]');

  // Logout button (only visible after login)
  readonly logout: Locator = this.root.locator('button:has-text("Logout")');

  // Error message (on failed login)
  readonly errorMessage: Locator = this.root.locator('[data-testid="login-error"], .error, .alert');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyLoginFields(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.logout.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyLoginFailed(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
  }

  async performLogout(): Promise<void> {
    await this.logout.click();
    await this.login.waitFor({ state: 'visible' });
  }
}
