import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page!: Page;
  readonly root!: Locator;

  readonly userName: Locator = this.root.locator('[name="username"]');
  readonly password: Locator = this.root.locator('[name="password"]');
  readonly login: Locator = this.root.locator('[type="submit"]');
  readonly error: Locator = this.root.locator('#error-message');
  readonly forgotPassword: Locator = this.root.locator('a[href="#forgot"]');

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async performLogin(username: string, password: string): Promise<void> {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyMainElements(): Promise<void> {
    await this.userName.waitFor({ state: 'visible' });
    await this.password.waitFor({ state: 'visible' });
    await this.login.waitFor({ state: 'visible' });
    await this.forgotPassword.waitFor({ state: 'visible' });
  }
}
