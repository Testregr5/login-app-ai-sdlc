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
    await loginPage.performLogin('invalidUser', 'invalidPass');
    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toHaveText(/invalid|Incorrect|wrong/i);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('demo', 'demo');
    await expect(page).toHaveURL(/dashboard|welcome|home/i);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('should go to Forgot Password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.forgotPassword.click();
    await expect(page).toHaveURL(/forgot/i);
    await expect(page.locator('text=Reset Password')).toBeVisible();
  });

});
