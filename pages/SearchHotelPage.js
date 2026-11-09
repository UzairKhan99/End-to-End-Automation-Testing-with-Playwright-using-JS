class SearchHotelPage {
  constructor(page) {
    this.page = page;
    this.location = page.locator('#location');
    this.hotel = page.locator('#hotels');
    this.roomType = page.locator('#room_type');
    this.numberOfRooms = page.locator('#room_nos');
    this.checkInDate = page.locator('#datepick_in');
    this.checkOutDate = page.locator('#datepick_out');
    this.adultsPerRoom = page.locator('#adult_room');
    this.searchButton = page.locator('#Submit');
  }

  async searchHotel() {
    await this.location.selectOption({ label: 'Sydney' });
    await this.hotel.selectOption({ index: 1 });
    await this.roomType.selectOption({ index: 1 });
    await this.numberOfRooms.selectOption({ index: 1 });
    await this.checkInDate.fill('15/11/2026');
    await this.checkOutDate.fill('16/11/2026');
    await this.adultsPerRoom.selectOption({ index: 1 });
    await this.searchButton.click();
  }
}

module.exports = { SearchHotelPage };