import { test, expect } from '@playwright/test';

test('My first Playwright test', async ({ page }) => {
  await page.goto('https://adactinhotelapp.com/');
  await expect(page).toHaveTitle(/Adactin/i);
});