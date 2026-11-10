const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js'); // Use '../pages/LoginPage.js' if file is directly in tests/

test('Negative Test - Login with invalid username/password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const YOUR_USERNAME = 'Ali';
  const YOUR_PASSWORD = '112';

  await loginPage.open();
  await loginPage.login(YOUR_USERNAME, YOUR_PASSWORD);

  // 1. Verify user did NOT go to Search Hotel page
  await expect(page).not.toHaveURL(/SearchHotel/i);

  // 2. Mandatory Assertion: Verify the error message appears
  await expect(page.locator('.auth_error')).toBeVisible();
  await expect(page.locator('.auth_error')).toContainText('Invalid Login details');
});