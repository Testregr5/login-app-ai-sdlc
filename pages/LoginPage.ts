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

  // Remember me
  readonly rememberMe: Locator = this.root.locator('[name="remember"]');

  // Google login
  readonly googleLogin: Locator = this.root.locator('[aria-label="Login with Google"]');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async performLogin(username: string, password: string, remember: boolean = false): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    if (remember) {
      await this.rememberMe.check();
    }
    await this.login.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.username.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
    await this.rememberMe.waitFor({ state: 'visible' });
    await this.googleLogin.waitFor({ state: 'visible' });
  }
}
