const { test, expect } = require('@playwright/test');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { registerLoginBeforeEach } = require('../helpers/authHooks.js');

registerLoginBeforeEach(test);

test('Negative Test - Search Hotel without selecting mandatory fields', async ({ page }) => {
  const searchPage = new SearchHotelPage(page);

  await expect(page).toHaveURL(/SearchHotel\.php/);

  await searchPage.searchButton.click();

  await expect(page).toHaveURL(/SearchHotel\.php/);
  await expect(page.getByText('Please Select a Location', { exact: true })).toBeVisible();
});