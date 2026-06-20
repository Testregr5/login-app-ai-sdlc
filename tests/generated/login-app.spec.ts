import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyMainElements();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.login('fake@test.com', 'wrongpassword');
    await loginAppPage.verifyLoginError();
    await expect(loginAppPage.errorMessage).toContainText('Invalid');
  });

  test('should redirect to register page when clicking register link', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.registerLink.click();
    await expect(page).toHaveURL(/\/register/);
  });
});
