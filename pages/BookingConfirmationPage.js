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
    await this.myItineraryButton.click({ noWaitAfter: true });

    try {
      await this.page.waitForFunction(
        () => window.location.pathname.endsWith('/BookedItinerary.php'),
        null,
        { timeout: 10000 }
      );
    } catch (error) {
      const href = await this.myItineraryButton.getAttribute('href');
      if (!href) {
        throw error;
      }

      await this.page.goto(new URL(href, this.page.url()).href, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
    }
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { BookingConfirmationPage };