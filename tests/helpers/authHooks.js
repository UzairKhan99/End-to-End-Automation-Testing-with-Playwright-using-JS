const { LoginPage } = require('../../pages/LoginPage.js');
const { getAdactinCredentials } = require('../../utils/envUtils.js');

function registerLoginBeforeEach(test) {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = getAdactinCredentials();

    await loginPage.open();
    await loginPage.login(username, password);
  });
}

module.exports = { registerLoginBeforeEach };
