import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  readonly page!: Page;
  readonly root!: Locator;

  readonly username: Locator = this.root.locator('[name="username"]');
  readonly password: Locator = this.root.locator('[name="password"]');
  readonly login: Locator = this.root.locator('button[type="submit"]');
  readonly logout: Locator = this.root.locator('button[aria-label="Logout"]');
  readonly loginError: Locator = this.root.locator('[aria-label="Login Error"]');
  readonly loginApp: Locator = this.root.locator('h2');

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

  async logoutAction(): Promise<void> {
    await this.logout.waitFor({ state: 'visible' });
    await this.logout.click();
  }

  async verifyLoginFormVisible(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
  }

  async verifyLoginSuccess(): Promise<void> {
    await this.logout.waitFor({ state: 'visible' });
  }

  async verifyLoginFailed(): Promise<void> {
    await this.loginError.waitFor({ state: 'visible' });
  }
}
