import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginVisibleElements();
  });

  test('should show/hide password when clicking toggle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.password.fill('testpass');
    // Password field should be type password by default
    await expect(loginPage.password).toHaveAttribute('type', 'password');
    await loginPage.showPasswordClick();
    await expect(loginPage.password).toHaveAttribute('type', 'text');
    await loginPage.showPasswordClick();
    await expect(loginPage.password).toHaveAttribute('type', 'password');
  });

  test('should fail to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('wronguser', 'wrongpass');
    await expect(loginPage.invalidUsernameOrPassword).toBeVisible();
  });

  test('should redirect to home page after successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('user', 'password');
    // Home page contains 'Logout' link
    await expect(page.locator('text=Logout')).toBeVisible();
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.forgotPassword.click();
    await expect(page).toHaveURL(/\/forgot-password/);
    await expect(page.locator('text=Forgot Password')).toBeVisible();
  });
});
