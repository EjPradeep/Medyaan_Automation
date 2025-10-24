const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { StallRefund } = require('/Medyaanbeg/Methods/ExternalManager/EM_StallRefund');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



test.describe.serial('TS01 - External_Manager ', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

    //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);
    });
});
test.describe.serial('TS02 - Settlement', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/ExternalManager.xlsx", "EM_StallRefund");

    test('TC001 -  Goto EM_EventRefund Page and Settle', async ({ page }) => {
        const { Cus_ID, Cus_Name, Event_Name, Amount } = data[0];

        const stallRef = new StallRefund(page);

        await stallRef.Select_Module()
        await stallRef.PendingTab()
        await stallRef.Checkbox(Cus_ID,Cus_Name,Event_Name,Amount)
        await stallRef.Settle_Button();

    })
})