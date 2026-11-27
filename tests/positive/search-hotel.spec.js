const { test, expect } = require('@playwright/test');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const hotelScenarios = require('../../test-data/hotel.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { registerLoginBeforeEach } = require('../helpers/authHooks.js');

registerLoginBeforeEach(test);

for (const hotelScenario of hotelScenarios) {
  test(hotelScenario.testName, async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
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

    await expect(searchPage.searchButton).toBeEnabled();
    await searchPage.searchHotel(searchData);

    await expect(page).toHaveURL(/SelectHotel\.php/);
    await expect(page).toHaveTitle(/Select Hotel/i);
  });
}