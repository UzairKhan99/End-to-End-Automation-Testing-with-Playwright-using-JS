const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const hotelScenarios = require('../../test-data/hotel.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

for (const hotelScenario of hotelScenarios) {
  test(hotelScenario.testName, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const searchPage = new SearchHotelPage(page);
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

    await loginPage.open();
    await loginPage.login(username, password);

    await expect(searchPage.searchButton).toBeEnabled();
    await searchPage.searchHotel(searchData);

    await expect(page).toHaveURL(/SelectHotel\.php/);
    await expect(page).toHaveTitle(/Select Hotel/i);
  });
}