const { test, expect } = require('@playwright/test');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const hotelScenarios = require('../../test-data/hotel.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { registerLoginBeforeEach } = require('../helpers/authHooks.js');

registerLoginBeforeEach(test);

test('Select Hotel Test', async ({ page }) => {
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);
  const hotelScenario = hotelScenarios[0];

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

  await searchPage.searchHotel(searchData);

  await  expect(selectPage.continueButton).toBeEnabled()
  await selectPage.selectHotel();

  // Assertions: Verify navigation to Book A Hotel page
  await expect(page).toHaveURL(/BookHotel\.php/);
  await expect(page).toHaveTitle(/Book A Hotel/i);
});