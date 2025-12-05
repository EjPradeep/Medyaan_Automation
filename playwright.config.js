// @ts-check
import { defineConfig, devices } from '@playwright/test';
                          
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,

  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/results.xml' }],
  ],

  use: {
    headless: false,
    // Remove viewport setting and add screen mode
    launchOptions: {
      args: ['--start-maximized'], // This will maximize the window
      slowMo: 100
    },
    trace: 'on-first-retry',
  
    // Remove browserContext: 'persist' as we'll handle it in Custom_test.js
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']
      },
    }
  ],
  
});
// playwright.config.js

module.exports = defineConfig({
  use: {
    headless: false, // Needed to see the actual browser window
    viewport: null,  // Uses the full available screen
    launchOptions: {
      args: ['--start-maximized']
    }
  }
});
