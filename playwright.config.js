const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',

  fullyParallel: false,
  workers: 1,

  retries: process.env.CI ? 1 : 0,
  timeout: 30000,
  expect: {
    timeout: 5000
  },

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['allure-playwright', {
      resultsDir: 'allure-results'
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://adactinhotelapp.com',
    browserName: 'chromium',
    headless: true,
    viewport: {
      width: 1366,
      height: 768
    },
    actionTimeout: 10000,
    navigationTimeout: 20000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },

  outputDir: 'test-results',
  forbidOnly: !!process.env.CI
});
