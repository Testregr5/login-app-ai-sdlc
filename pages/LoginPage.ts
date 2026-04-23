import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page!: Page;
  readonly root!: Locator;

  // Username or Email
  readonly username: Locator = this.root.locator('[name="username"]');

  // Password
  readonly password: Locator = this.root.locator('[name="password"]');

  // Login
  readonly login: Locator = this.root.locator('button[type="submit"]');

  // Register
  readonly register: Locator = this.root.locator('a[href="#/register"]');

  // Error Message
  readonly invalidCredentials: Locator = this.root.locator('text=Invalid credentials');
  
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

  async verifyMainElements(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
    await this.register.waitFor({ state: 'visible' });
  }
}