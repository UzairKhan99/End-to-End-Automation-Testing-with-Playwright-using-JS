const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const { BookHotelPage } = require('../../pages/BookHotelPage.js');
const { BookingConfirmationPage } = require('../../pages/BookingConfirmationPage.js');
const hotelScenarios = require('../../test-data/hotel.json');
const bookingData = require('../../test-data/booking.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

test('End-to-End Hotel Booking Flow (Steps 1 to 7)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);
  const bookPage = new BookHotelPage(page);
  const confirmPage = new BookingConfirmationPage(page);
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
  await bookPage.bookHotel(bookingData);

  // Step 5: Booking Confirmation (Verify Order No. is generated)
  await expect(page).toHaveURL(/BookingConfirm\.php/, { timeout: 15000 });
  await expect(confirmPage.orderNumber).not.toHaveValue('');
  const orderId = await confirmPage.getOrderNumber();

  // Step 6: Booking Itinerary (Click My Itinerary & verify Order No. appears)
  await expect(confirmPage.myItineraryButton).toBeEnabled();
  await confirmPage.clickMyItinerary();
  await expect(page).toHaveURL(/BookedItinerary\.php/);
  await expect(page.locator('input[value]').first()).toBeVisible();

  // Step 7: Logout (Click Logout & verify logged out)
  await expect(confirmPage.logoutButton).toBeEnabled();
  await confirmPage.logout();
  await expect(page).toHaveURL(/Logout\.php/, { timeout: 15000 });
  await expect(page.locator('body')).toContainText(/successfully logged out/i);
});