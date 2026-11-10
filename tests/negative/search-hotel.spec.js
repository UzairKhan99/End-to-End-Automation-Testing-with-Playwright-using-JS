const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');

test('Negative Test - Search Hotel without selecting mandatory fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);

  await loginPage.open();
  await loginPage.login('mufeezhanif', 'Hello0009');
  await expect(page).toHaveURL(/SearchHotel\.php/);

  await searchPage.searchButton.click();

  await expect(page).toHaveURL(/SearchHotel\.php/);
  await expect(page.getByText('Please Select a Location', { exact: true })).toBeVisible();
});