const { test, expect } = require('@playwright/test');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const { BookHotelPage } = require('../../pages/BookHotelPage.js');
const { registerLoginBeforeEach } = require('../helpers/authHooks.js');
const hotelScenarios = require('../../test-data/hotel.json');
const bookingData = require('../../test-data/booking.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');

registerLoginBeforeEach(test);

async function openBookingPage(page) {
  const hotelScenario = hotelScenarios[0];
  const dates = getFutureHotelDates(
    hotelScenario.checkIn.daysFromToday,
    hotelScenario.checkOut.stayLength
  );

  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);

  await searchPage.searchHotel({
    location: hotelScenario.location,
    hotel: hotelScenario.hotel,
    roomType: hotelScenario.roomType,
    numberOfRooms: hotelScenario.numberOfRooms,
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    adults: hotelScenario.adults
  });
  await selectPage.selectHotel();

  await expect(page).toHaveURL(/BookHotel\.php/, { timeout: 15000 });
  return new BookHotelPage(page);
}

test('Negative - Booking requires first name', async ({ page }) => {
  const bookPage = await openBookingPage(page);
  await bookPage.bookHotel({ ...bookingData, firstName: '' });

  await expect(page.locator('#first_name_span')).toContainText(
    'Please Enter your First Name'
  );
});

test('Negative - Booking requires last name', async ({ page }) => {
  const bookPage = await openBookingPage(page);
  await bookPage.bookHotel({ ...bookingData, lastName: '' });

  await expect(page.locator('#last_name_span')).toContainText(
    'Please Enter you Last Name'
  );
});

test('Negative - Booking requires billing address', async ({ page }) => {
  const bookPage = await openBookingPage(page);
  await bookPage.bookHotel({ ...bookingData, address: '' });

  await expect(page.locator('#address_span')).toContainText(
    'Please Enter your Address'
  );
});

test('Negative - Booking rejects short credit card number', async ({ page }) => {
  const bookPage = await openBookingPage(page);
  await bookPage.bookHotel({ ...bookingData, cardNumber: '1234' });

  await expect(page.locator('#cc_num_span')).toContainText(/16 Digit/);
});

test('Negative - Booking requires CVV', async ({ page }) => {
  const bookPage = await openBookingPage(page);
  await bookPage.bookHotel({ ...bookingData, cvv: '' });

  await expect(page.locator('#cc_cvv_span')).toContainText(
    'Please Enter your Credit Card CVV Number'
  );
});