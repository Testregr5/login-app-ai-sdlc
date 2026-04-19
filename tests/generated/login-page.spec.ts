import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPageElements();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('invalidUser', 'invalidPass');
    await loginPage.verifyInvalidCredentials();
  });

  test('should login successfully with valid credentials and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('test', 'test');
    // Home screen appears with Logout
    await expect(loginPage.logout).toBeVisible();
    await loginPage.logoutIfLoggedIn();
    // After logout, login form should be visible again
    await loginPage.verifyLoginPageElements();
  });
});
