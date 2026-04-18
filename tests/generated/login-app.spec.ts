import { test, expect } from '@playwright/test';
import { LoginAppPage } from '../../pages/LoginAppPage';

test.describe('LoginAppPage Tests', () => {

  test('should display all main elements', async ({ page }) => {
    const loginapppage = new LoginAppPage(page);
    await loginapppage.goto();
    await loginapppage.verifyMainElements();
  });

  test('should show error message on invalid login', async ({ page }) => {
    const loginapppage = new LoginAppPage(page);
    await loginapppage.goto();
    await loginapppage.performLogin('invalid@example.com', 'wrongpassword');
    await expect(loginapppage.message).toBeVisible();
    const msg = await loginapppage.getMessageText();
    expect(msg.toLowerCase()).toContain('invalid');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginapppage = new LoginAppPage(page);
    await loginapppage.goto();
    await loginapppage.performLogin('testuser@email.com', 'testpass');
    await expect(loginapppage.message).toBeVisible();
    const msg = await loginapppage.getMessageText();
    expect(msg.toLowerCase()).toContain('success');
  });
});
