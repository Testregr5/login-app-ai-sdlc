import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {
  test('should display login fields', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyLoginFields();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWithCredentials('demo', 'demo');
    await loginAppPage.verifySuccessfulLogin();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWithCredentials('invalid-user', 'invalid-pass');
    await loginAppPage.verifyLoginFailed();
    await expect(page.locator('[data-testid="login-error"], .error, .alert')).toBeVisible();
  });

  test('should logout after successful login', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWithCredentials('demo', 'demo');
    await loginAppPage.verifySuccessfulLogin();
    await loginAppPage.performLogout();
    await loginAppPage.verifyLoginFields();
  });
});
