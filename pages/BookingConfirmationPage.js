class BookingConfirmationPage {
  constructor(page) {
    this.page = page;
    this.orderNumber = page.locator('#order_no');
    this.myItineraryButton = page.locator('a[href="BookedItinerary.php"]');
    this.logoutButton = page.locator('a[href="Logout.php"]');
  }

  async getOrderNumber() {
    return await this.orderNumber.inputValue();
  }

  async clickMyItinerary() {
    await this.myItineraryButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { BookingConfirmationPage };