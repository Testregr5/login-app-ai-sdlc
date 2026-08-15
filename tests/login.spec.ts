import { test, expect } from '@playwright/test';

const loginUrl = 'https://testregr5.github.io/login-app-ai-sdlc/';

// Locators based on app inspection, adapt selectors as needed.
const selectors = {
  username: '#username',
  password: '#password',
  login: '#loginBtn',
  errorMsg: '#errorMsg',
  welcomeMsg: '#welcomeMsg',
};

const validUser = { username: 'testuser', password: 'Test@1234' };

// Each test represents one acceptance criterion/case from EPMCDMETST-39332

test.describe('EPMCDMETST-39332: Login Validation & Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('1. Successful login with correct credentials', async ({ page }) => {
    await page.fill(selectors.username, validUser.username);
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await expect(page.locator(selectors.welcomeMsg)).toBeVisible();
  });

  test('2. Successful login with Enter key', async ({ page }) => {
    await page.fill(selectors.username, validUser.username);
    await page.fill(selectors.password, validUser.password);
    await page.press(selectors.password, 'Enter');
    await expect(page.locator(selectors.welcomeMsg)).toBeVisible();
  });

  test('3. Incorrect username fails login', async ({ page }) => {
    await page.fill(selectors.username, 'wronguser');
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('4. Incorrect password fails login', async ({ page }) => {
    await page.fill(selectors.username, validUser.username);
    await page.fill(selectors.password, 'wrongpass');
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('5. Both username and password incorrect', async ({ page }) => {
    await page.fill(selectors.username, 'invalid');
    await page.fill(selectors.password, 'invalid');
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('6. Username and password both empty', async ({ page }) => {
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('7. Username provided but password empty', async ({ page }) => {
    await page.fill(selectors.username, validUser.username);
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('8. Password provided but username empty', async ({ page }) => {
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('9. Field validation triggers on Enter submission', async ({ page }) => {
    await page.press(selectors.username, 'Enter');
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('10. Username with leading/trailing spaces is trimmed', async ({ page }) => {
    await page.fill(selectors.username, '  ' + validUser.username + '  ');
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await expect(page.locator(selectors.welcomeMsg)).toBeVisible();
  });

  test('11. Username is case sensitive', async ({ page }) => {
    await page.fill(selectors.username, validUser.username.toUpperCase());
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('12. Password is not trimmed', async ({ page }) => {
    await page.fill(selectors.username, validUser.username);
    await page.fill(selectors.password, '  ' + validUser.password + '  ');
    await page.click(selectors.login);
    await expect(page.locator(selectors.errorMsg)).toBeVisible();
  });

  test('13. Too many attempts after 3 consecutive failures', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.fill(selectors.username, validUser.username);
      await page.fill(selectors.password, 'wrongpass');
      await page.click(selectors.login);
    }
    await expect(page.locator(selectors.errorMsg)).toContainText('too many attempts');
  });

  test('14. Successful login resets failed attempt count', async ({ page }) => {
    for (let i = 0; i < 2; i++) {
      await page.fill(selectors.username, validUser.username);
      await page.fill(selectors.password, 'wrongpass');
      await page.click(selectors.login);
    }
    // Now login successfully
    await page.fill(selectors.username, validUser.username);
    await page.fill(selectors.password, validUser.password);
    await page.click(selectors.login);
    await page.reload(); // Simulate logout
    // Try failing again, count should have reset
    for (let i = 0; i < 2; i++) {
      await page.fill(selectors.username, validUser.username);
      await page.fill(selectors.password, 'wrongpass');
      await page.click(selectors.login);
    }
    await expect(page.locator(selectors.errorMsg)).not.toContainText('too many attempts');
  });

  test('15. Enter key after 3 failures also triggers too many attempts', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.fill(selectors.username, validUser.username);
      await page.fill(selectors.password, 'wrongpass');
      await page.press(selectors.password, 'Enter');
    }
    await expect(page.locator(selectors.errorMsg)).toContainText('too many attempts');
  });
});
