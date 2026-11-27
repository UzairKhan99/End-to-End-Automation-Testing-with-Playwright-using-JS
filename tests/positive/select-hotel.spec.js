const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { SearchHotelPage } = require('../../pages/SearchHotelPage.js');
const { SelectHotelPage } = require('../../pages/Select_hotel_page.js');
const hotelScenarios = require('../../test-data/hotel.json');
const { getFutureHotelDates } = require('../../utils/dateUtils.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

test('Select Hotel Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchHotelPage(page);
  const selectPage = new SelectHotelPage(page);
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
  await  expect(selectPage.continueButton).toBeEnabled()
  await selectPage.selectHotel();

  // Assertions: Verify navigation to Book A Hotel page
  await expect(page).toHaveURL(/BookHotel\.php/);
  await expect(page).toHaveTitle(/Book A Hotel/i);
});