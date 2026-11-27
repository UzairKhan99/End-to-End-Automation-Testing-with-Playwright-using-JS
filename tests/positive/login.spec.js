const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { username, password } = getAdactinCredentials();
  await loginPage.open();
  await loginPage.login(username, password);

  await expect(page).toHaveURL(/SearchHotel/i);
});
