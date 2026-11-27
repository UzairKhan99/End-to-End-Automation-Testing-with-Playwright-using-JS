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

  async bookHotel(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.address.fill(data.address);
    await this.ccNum.fill(data.cardNumber);
    await this.ccType.selectOption({ label: data.cardType });
    await this.ccExpMonth.selectOption({ label: data.expiryMonth });
    await this.ccExpYear.selectOption({ label: data.expiryYear });
    await this.ccCvv.fill(data.cvv);
    await this.bookNowButton.click();
  }
}

module.exports = { BookHotelPage };