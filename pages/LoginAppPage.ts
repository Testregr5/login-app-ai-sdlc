import { Page, Locator } from '@playwright/test';

export class LoginAppPage {
  private readonly page: Page;
  private readonly root: Locator;

  // Locators for login inputs and buttons
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly logoutButton: Locator;
  private readonly signUpLink: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root || page.locator('body');

    this.emailInput = this.root.locator('#email');
    this.passwordInput = this.root.locator('#password');
    this.loginButton = this.root.locator('button[type="submit"]');
    this.logoutButton = this.root.locator('button[data-testid="logout"]');
    this.signUpLink = this.root.locator('a[href="#signup"]');
    this.errorMsg = this.root.locator('[role="alert"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://testregr5.github.io/login-app-ai-sdlc/');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.logoutButton.click();
  }

  async error(): Promise<string | null> {
    if (await this.errorMsg.isVisible()) {
      return await this.errorMsg.textContent();
    }
    return null;
  }

  async verifyMainElements(): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
    await this.signUpLink.waitFor({ state: 'visible' });
  }

  async navigateToSignUp(): Promise<void> {
    await this.signUpLink.waitFor({ state: 'visible' });
    await this.signUpLink.click();
  }
}