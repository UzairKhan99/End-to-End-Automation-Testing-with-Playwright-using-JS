const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const { BookHotelPage } = require('../../pages/BookHotelPage.js');

test('Book Hotel Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);
  const bookPage = new BookHotelPage(page);

  const YOUR_USERNAME = 'mufeezhanif';
  const YOUR_PASSWORD = 'Hello0009';

  // Step 1: Login
  await loginPage.open();
  await loginPage.login(YOUR_USERNAME, YOUR_PASSWORD);

  // Step 2: Search Hotel
  await searchPage.searchHotel();

  // Step 3: Select Hotel
  await selectPage.selectHotel();

  // Step 4: Book Hotel
  await expect(bookPage.bookNowButton).toBeEnabled();
  await bookPage.bookHotel();

  // Assertions: Wait up to 15s for Booking Confirmation page to load
  await expect(page).toHaveURL(/BookingConfirm\.php/, { timeout: 15000 });
  await expect(page).toHaveTitle(/Hotel Booking Confirmation/i);
});