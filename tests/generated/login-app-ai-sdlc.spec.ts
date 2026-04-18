import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyMainElements();
  });

  test('should fail login with invalid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.performLogin('invalid@example.com', 'wrongpassword');
    await expect(loginAppPage.errorMessage).toBeVisible();
    const errorText = await loginAppPage.getErrorMessage();
    expect(errorText).toContain('Invalid email or password');
  });

  test('should navigate to sign up page on click', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.signUp.click();
    await expect(page).toHaveURL(/#signup/);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.performLogin('user@example.com', 'Password123');
    await expect(page).toHaveURL(/dashboard/);
  });
});
