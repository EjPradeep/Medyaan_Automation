const { test, expect } = require('../Custom_test');
const { Homepage } = require('/Medyaanbeg/Methods/Common_Operation/Loginpage');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



//Login to  Using Valid Credential.
test.describe.serial('TS01 -  Login Page', () => {
  const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");
  test.setTimeout(120000);
  test("TC001 - Login to  Using Valid Credential", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});
