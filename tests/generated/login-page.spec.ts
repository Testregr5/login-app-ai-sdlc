import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page - EPMCDMETST-39332', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display the login form', async ({ page }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  // Valid login test (credentials should be replaced with valid set for the app)
  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('validUser', 'validPass');
    // Add assertion for successful login, e.g., navigation or user greeting
    await expect(page).not.toHaveURL(/login/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await loginPage.login('invalidUser', 'invalidPass');
    await expect(loginPage.errorBanner).toBeVisible();
  });
});
