function collectBrowserLogs(page) {
  const messages = [];

  page.on('console', (message) => {
    messages.push(`[console:${message.type()}] ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    messages.push(`[pageerror] ${error.message}`);
  });

  return messages;
}

async function attachBrowserLogs(testInfo, messages) {
  await testInfo.attach('Browser console logs', {
    body: messages.length ? messages.join('\n') : 'No browser console messages.',
    contentType: 'text/plain'
  });
}

module.exports = { attachBrowserLogs, collectBrowserLogs };
