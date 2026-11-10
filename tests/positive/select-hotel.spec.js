const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');

test('Select Hotel Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);

  const YOUR_USERNAME = 'mufeezhanif';
  const YOUR_PASSWORD = 'Hello0009';

  // Step 1: Login
  await loginPage.open();
  await loginPage.login(YOUR_USERNAME, YOUR_PASSWORD);

  // Step 2: Search Hotel
  await searchPage.searchHotel();

  // Step 3: Select Hotel
  await  expect(selectPage.continueButton).toBeEnabled()
  await selectPage.selectHotel();

  // Assertions: Verify navigation to Book A Hotel page
  await expect(page).toHaveURL(/BookHotel\.php/);
  await expect(page).toHaveTitle(/Book A Hotel/i);
});