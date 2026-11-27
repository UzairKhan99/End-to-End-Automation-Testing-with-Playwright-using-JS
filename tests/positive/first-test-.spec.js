const { test, expect } = require('@playwright/test');
const { registerFailureScreenshot } = require('../helpers/authHooks.js');

registerFailureScreenshot(test);

test('My first Playwright test', async ({ page }) => {
  await page.goto('https://adactinhotelapp.com/');
  await expect(page).toHaveTitle(/Adactin/i);
});