import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('LoginPage Tests', () => {
  test('should display all main elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyMainElements();
    await expect(loginPage.title).toHaveText('Login');
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.login).toBeVisible();
  });

  test('should not allow login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login.click();
    await loginPage.expectError('Please enter a username and password');
  });

  test('should display error on wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('invalid', 'invalid');
    await loginPage.expectError('Invalid username or password');
  });

  test('should allow toggling password visibility', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.password).toHaveAttribute('type', 'password');
    await loginPage.togglePasswordVisibility();
    await expect(loginPage.password).toHaveAttribute('type', 'text');
  });

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs('test', 'test');
    await expect(page).toHaveURL(/dashboard|welcome|protected/i);
    await expect(page.locator('text=Logout')).toBeVisible();
  });
});
