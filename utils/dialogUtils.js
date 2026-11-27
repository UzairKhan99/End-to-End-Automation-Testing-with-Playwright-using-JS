function acceptNextDialog(page) {
  return page.waitForEvent('dialog').then((dialog) => dialog.accept());
}

function dismissNextDialog(page) {
  return page.waitForEvent('dialog').then((dialog) => dialog.dismiss());
}

module.exports = { acceptNextDialog, dismissNextDialog };
