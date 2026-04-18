import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {

  test('should display all main elements', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.verifyMainElements();
  });

  test('should show error for empty login', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.performLogin('', '');
    await loginAppPage.verifyError('Invalid email or password');
  });

  test('should show error for incorrect credentials', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.performLogin('notexist@example.com', 'wrongpassword');
    await loginAppPage.verifyError('Invalid email or password');
  });

  test('should navigate to register page when clicking Register', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();
    await loginAppPage.register.click();
    await expect(page).toHaveURL('https://testregr5.github.io/login-app-ai-sdlc/register');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should require email and password fields', async ({ page }) => {
    const loginAppPage = new LoginAppPage(page);
    await loginAppPage.goto();

    await loginAppPage.email.fill('');
    await loginAppPage.password.fill('');
    await loginAppPage.login.click();
    await loginAppPage.verifyError('Invalid email or password');
  });

});
