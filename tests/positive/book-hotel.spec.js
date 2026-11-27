const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const { BookHotelPage } = require('../../pages/BookHotelPage.js');
const hotelScenarios = require('../../test-data/hotel.json');
const bookingData = require('../../test-data/booking.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

test('Book Hotel Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);
  const bookPage = new BookHotelPage(page);
  const hotelScenario = hotelScenarios[0];

  const { username, password } = getAdactinCredentials();
  const dates = getFutureHotelDates(
    hotelScenario.checkIn.daysFromToday,
    hotelScenario.checkOut.stayLength
  );
  const searchData = {
    location: hotelScenario.location,
    hotel: hotelScenario.hotel,
    roomType: hotelScenario.roomType,
    numberOfRooms: hotelScenario.numberOfRooms,
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    adults: hotelScenario.adults
  };

  // Step 1: Login
  await loginPage.open();
  await loginPage.login(username, password);

  // Step 2: Search Hotel
  await searchPage.searchHotel(searchData);

  // Step 3: Select Hotel
  await selectPage.selectHotel();

  // Step 4: Book Hotel
  await expect(bookPage.bookNowButton).toBeEnabled();
  await bookPage.bookHotel(bookingData);

  // Assertions: Wait up to 15s for Booking Confirmation page to load
  await expect(page).toHaveURL(/BookingConfirm\.php/, { timeout: 15000 });
  await expect(page).toHaveTitle(/Hotel Booking Confirmation/i);
});