async function captureFailureScreenshot(page, testInfo) {
  const screenshotPath = testInfo.outputPath('failure.png');

  await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach('Failure screenshot', {
    path: screenshotPath,
    contentType: 'image/png'
  });
}

module.exports = { captureFailureScreenshot };
