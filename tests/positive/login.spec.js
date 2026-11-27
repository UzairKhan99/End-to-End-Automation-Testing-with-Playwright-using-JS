const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');
const { registerFailureScreenshot } = require('../helpers/authHooks.js');

registerFailureScreenshot(test);

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { username, password } = getAdactinCredentials();
  await loginPage.open();
  await loginPage.login(username, password);

  await expect(page).toHaveURL(/SearchHotel/i);
});
