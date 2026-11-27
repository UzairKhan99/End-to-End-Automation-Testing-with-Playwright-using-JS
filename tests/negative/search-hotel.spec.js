const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

test('Negative Test - Search Hotel without selecting mandatory fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const { username, password } = getAdactinCredentials();

  await loginPage.open();
  await loginPage.login(username, password);
  await expect(page).toHaveURL(/SearchHotel\.php/);

  await searchPage.searchButton.click();

  await expect(page).toHaveURL(/SearchHotel\.php/);
  await expect(page.getByText('Please Select a Location', { exact: true })).toBeVisible();
});