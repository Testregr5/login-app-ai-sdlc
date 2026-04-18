import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {
  test('should show login page elements', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyLoginPageVisible();
  });

  test('should fail login with wrong credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.login('wronguser', 'wrongpass');
    await loginAppPage.verifyErrorVisible();
    await expect(loginAppPage.errorMessage).toBeVisible();
    await expect(loginAppPage.errorMessage).toHaveText(/Invalid username or password/i);
  });

  test('should login with correct credentials and show logout', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.login('demouser', 'demopass');
    await loginAppPage.verifyLogoutVisible();
    await expect(loginAppPage.logoutLink).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.login('demouser', 'demopass');
    await loginAppPage.verifyLogoutVisible();
    await loginAppPage.logoutLink.click();
    await loginAppPage.verifyLoginPageVisible();
    await expect(page).toHaveURL(/\/login-app-ai-sdlc\/$/);
  });
});
