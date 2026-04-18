import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {

  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyMainElements();
  });

  test('should show error on invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWith('invalidUser', 'wrongPass');
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(/invalid|Incorrect|error/i);
  });

  test('should login successfully with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWith('user', 'password');
    await expect(page).toHaveURL(/dashboard|home|welcome|#/i);
    // Optional: Verify presence of a dashboard element after login
  });

  test('should open forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.forgotPassword.click();
    await expect(page).toHaveURL(/forgot-password/);
    // Optional: Check for presence of reset form
  });

});
