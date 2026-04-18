import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {
  test('should display login form', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyLoginFormVisible();
    await expect(page.locator('h2')).toHaveText('Login App');
  });

  test('should login with valid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWith('demouser', 'testingisfun');
    await loginAppPage.verifyLoginSuccess();
    await expect(page.locator('button[aria-label="Logout"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWith('wronguser', 'wrongpass');
    await loginAppPage.verifyLoginFailed();
    await expect(page.locator('[aria-label="Login Error"]')).toBeVisible();
  });

  test('should logout after successful login', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.loginWith('demouser', 'testingisfun');
    await loginAppPage.verifyLoginSuccess();
    await loginAppPage.logoutAction();
    await loginAppPage.verifyLoginFormVisible();
  });
});
