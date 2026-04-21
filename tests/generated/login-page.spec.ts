import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyMainElements();
  });

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('admin', 'admin');
    await expect(page).toHaveURL(/dashboard|welcome|home|success/i);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('wronguser', 'wrongpass');
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('should toggle remember me checkbox', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.rememberMe).not.toBeChecked();
    await loginPage.rememberMe.check();
    await expect(loginPage.rememberMe).toBeChecked();
    await loginPage.rememberMe.uncheck();
    await expect(loginPage.rememberMe).not.toBeChecked();
  });
});
