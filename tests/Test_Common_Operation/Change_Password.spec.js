const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Changepass } = require('/Medyaanbeg/Common_Operation/Change_Password');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



//Login Using Valid Credential.
test.describe.serial('TS01 - AssetManager ', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

  //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);

    });
});
test.describe.serial('TS01 - ChangePassword', () => {
    //test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "ChangePassword");

    test('ChangePassword with Valid Credential', async ({ page }) => {
        const { CurrentPassword, NewPassword, ConfirmPassword } = data[0];

        const Changepassword = new Changepass(page);

        // Navigate to change password screen
        await Changepassword.NavToChangePassword();
        // Change password
        await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
        await Changepassword.ProceedButton();
        await page.waitForTimeout(2000)


    });
  test('ChangePassword with Invalid Credential', async ({ page }) => {
        const { CurrentPassword, NewPassword, ConfirmPassword } = data[1];

        const Changepassword = new Changepass(page);

        // Navigate to change password screen
        await Changepassword.NavToChangePassword();
        // Change password
        await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
        await Changepassword.ProceedButton();
        
    });



});



