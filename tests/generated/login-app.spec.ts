import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyMainElements();
  });

  test('should display error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithCredentials('invalidUser', 'invalidPass');
    await expect(loginPage.invalidCredentials).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.register.click();
    await expect(page).toHaveURL(/#\/register/);
  });
});
