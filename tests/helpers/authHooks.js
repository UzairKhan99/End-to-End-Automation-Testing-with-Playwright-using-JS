const { LoginPage } = require('../../pages/LoginPage.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');
const { attachBrowserLogs, collectBrowserLogs } = require('../../utils/logUtils.js');
const { captureFailureScreenshot } = require('../../utils/screenshotUtils.js');

function registerFailureScreenshot(test) {
  const logsByTest = new WeakMap();

  test.beforeEach(async ({ page }, testInfo) => {
    logsByTest.set(testInfo, collectBrowserLogs(page));
  });

  test.afterEach(async ({ page }, testInfo) => {
    await attachBrowserLogs(testInfo, logsByTest.get(testInfo) || []);

    if (testInfo.status !== testInfo.expectedStatus) {
      await captureFailureScreenshot(page, testInfo);
    }

    logsByTest.delete(testInfo);
  });
}

function registerLoginBeforeEach(test) {
  let credentials;

  registerFailureScreenshot(test);

  test.beforeAll(() => {
    credentials = getAdactinCredentials();
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
  });

  test.afterAll(() => {
    credentials = undefined;
  });
}

module.exports = { registerFailureScreenshot, registerLoginBeforeEach };
