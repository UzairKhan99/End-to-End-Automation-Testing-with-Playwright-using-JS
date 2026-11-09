class SelectHotelPage {
  constructor(page) {
    this.page = page;
    this.firstHotelRadio = page.locator('#radiobutton_0');
    this.continueButton = page.locator('#continue');
  }

  async selectHotel() {
    await this.firstHotelRadio.check();
    await this.continueButton.click();
  }
}

module.exports = { SelectHotelPage };