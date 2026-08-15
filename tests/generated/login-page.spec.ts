import { test, expect } from '@playwright/test';
import { Pages } from '../../pages/Pages';

const LOGIN_URL = 'https://testregr5.github.io/login-app-ai-sdlc/';

const validUsername = 'testuser';
const validPassword = 'testpass';
const invalidUsername = 'wronguser';
const invalidPassword = 'wrongpass';

test.describe('Login Page Tests - EPMCDMETST-39332', () => {
    test('Successful login redirects to dashboard', async ({ page }) => {
        const pages = new Pages(page);
        await pages.loginPage.goto();
        await pages.loginPage.login(validUsername, validPassword);
        // Example: expect dashboard or welcome
        await expect(page).toHaveURL(/dashboard|welcome/i);
    });

    test('Login fails with invalid credentials and shows error', async ({ page }) => {
        const pages = new Pages(page);
        await pages.loginPage.goto();
        await pages.loginPage.login(invalidUsername, invalidPassword);
        await expect(page.locator(pages.loginPage.errorMessage)).toBeVisible();
        await expect(page.locator(pages.loginPage.errorMessage)).toContainText('Invalid username or password');
    });

    test('Username and password fields required', async ({ page }) => {
        const pages = new Pages(page);
        await pages.loginPage.goto();
        await pages.loginPage.login('', '');
        await expect(page.locator(pages.loginPage.errorMessage)).toBeVisible();
        // Adjust message according to actual validation
        await expect(page.locator(pages.loginPage.errorMessage)).toContainText('required');
    });
});
