import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Username
  readonly username: Locator = this.root.locator('[name="username"]');

  // Password
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login
  readonly login: Locator = this.root.locator('button[type="submit"]');

  // Error Message
  readonly errorInvalidCredentials: Locator = this.root.locator('text=Invalid credentials');

  // Logout button (visible on home page after login)
  readonly logout: Locator = this.root.locator('button:text-matches("Logout", "i")');

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

  async verifyLoginPageElements(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
  }

  async verifyInvalidCredentials(): Promise<void> {
    await this.errorInvalidCredentials.waitFor({ state: 'visible' });
  }

  async logoutIfLoggedIn(): Promise<void> {
    if (await this.logout.isVisible().catch(() => false)) {
      await this.logout.click();
    }
  }
}
