class BookHotelPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address');
    this.ccNum = page.locator('#cc_num');
    this.ccType = page.locator('#cc_type');
    this.ccExpMonth = page.locator('#cc_exp_month');
    this.ccExpYear = page.locator('#cc_exp_year');
    this.ccCvv = page.locator('#cc_cvv');
    this.bookNowButton = page.locator('#book_now');
  }

  async bookHotel() {
    await this.firstName.fill('Uzair');
    await this.lastName.fill('Khan');
    await this.address.fill('Karachi, Pakistan');
    await this.ccNum.fill('1234567890123456'); // 16 digits required
    await this.ccType.selectOption({ index: 1 });
    await this.ccExpMonth.selectOption({ index: 1 });
    await this.ccExpYear.selectOption({ index: 10 });
    await this.ccCvv.fill('123');
    await this.bookNowButton.click();
  }
}

module.exports = { BookHotelPage };