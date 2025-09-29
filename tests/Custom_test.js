const base = require('@playwright/test');

let sharedContext = null;
let sharedPage = null;

exports.test = base.test.extend({
  context: async ({ browser }, use) => {
    if (!sharedContext) {
      sharedContext = await browser.newContext({headless: false, 
        //viewport: { width: 1920, height: 1080 }  // Set manually to full HD
      });
    }
    await use(sharedContext);
  },

  page: async ({ context }, use) => {
    if (!sharedPage) {
      sharedPage = await context.newPage();
    }
    await use(sharedPage);
  }
});


exports.expect = base.expect;
