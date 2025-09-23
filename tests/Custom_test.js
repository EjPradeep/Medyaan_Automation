const { test: base, chromium } = require('@playwright/test');

const isDebug = !!process.env.PWDEBUG;

const test = base.extend({
  browser: [
    async ({ }, use) => {
      const browser = await chromium.launch({
        headless: false,
       // slowMo: 50, // optional for visual clarity
      });
      await use(browser);
      if (!isDebug) {
        await browser.close();
      }
    },
    { scope: 'worker' },
  ],

  contextpage: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      await use(context);
      if (!isDebug) {
        await context.close();
      }
    },
    { scope: 'worker' },
  ],

  Page: [
    async ({ contextpage }, use) => {
      const page = await contextpage.newPage();
      await use(page);
      if (!isDebug) {
        await page.close();
      }
    },
    { scope: 'worker' },
  ],
});

module.exports = {
  test,
  timeout: 120000, // 2 minutes per test
  retries: 0,
  workers: 1,
  use: {
    actionTimeout: 0,
    navigationTimeout: 60000,
  },
};
