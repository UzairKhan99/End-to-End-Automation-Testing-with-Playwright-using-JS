const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const YOUR_USERNAME = 'mufeezhanif';
  const YOUR_PASSWORD = 'Hello0009';
  await loginPage.open();
  await loginPage.login(YOUR_USERNAME, YOUR_PASSWORD);

  await expect(page).toHaveURL(/SearchHotel/i);
});
