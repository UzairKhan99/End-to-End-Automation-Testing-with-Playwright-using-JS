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

  async searchHotel(data) {
    await this.location.selectOption({ label: data.location });
    await this.hotel.selectOption({ label: data.hotel });
    await this.roomType.selectOption({ label: data.roomType });
    await this.numberOfRooms.selectOption({ index: data.numberOfRooms });
    await this.checkInDate.fill(data.checkIn);
    await this.checkOutDate.fill(data.checkOut);
    await this.adultsPerRoom.selectOption({ index: data.adults });
    await this.searchButton.click();
  }
}

module.exports = { SearchHotelPage };