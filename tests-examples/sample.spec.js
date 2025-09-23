const { test, expect } = require('@playwright/test');

test('Login to Medyaan PMS', async ({ page }) => {
  await page.goto('https://pms-staging.medyaan.com/userlogin');

  // Enter username
  await page.fill('input[name="username"], input[type="text"]', '7339300833');

  // Enter password
  await page.fill('input[name="password"], input[type="password"]', 'Test@123');

  // Click the Login button
  await page.waitForTimeout(1000) 
  await page.click('button:has-text("Login")');

  // Optionally, check for successful login (e.g., dashboard loaded)
  await expect(page).toHaveURL("https://pms-staging.medyaan.com/userlogin/");
});