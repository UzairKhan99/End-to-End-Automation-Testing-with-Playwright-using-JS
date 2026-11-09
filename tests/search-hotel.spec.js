const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { SearchHotelPage } = require('../pages/SearchHotelPage.js');

test('Search Hotel Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const YOUR_USERNAME = 'mufeezhanif';
  const YOUR_PASSWORD = 'Hello0009';

  await loginPage.open();
  await loginPage.login(YOUR_USERNAME, YOUR_PASSWORD);

  await expect(searchPage.searchButton).toBeEnabled();
  await searchPage.searchHotel();

  await expect(page).toHaveURL(/SelectHotel\.php/);
  await expect(page).toHaveTitle(/Select Hotel/i);
});