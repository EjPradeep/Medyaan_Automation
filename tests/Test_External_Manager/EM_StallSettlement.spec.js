const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { StallSettlement } = require('/Medyaanbeg/Methods/ExternalManager/EM_StallSettlement');
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
    const data = readExcel("C:/Medyaanbeg/TestData/ExternalManager.xlsx", "EM_StallSettlement");

    test('TC001 -  Goto EM_StallSettlement Page and Settle', async ({ page }) => {
        const { Cus_ID, Cus_Name, Event_Name, Amount, } = data[0];

        const Ssettle = new StallSettlement(page);

        await Ssettle.Select_Module()
        await Ssettle.PendingTab()
        await Ssettle.Checkbox(Cus_ID,Cus_Name,Event_Name,Amount)
        await Ssettle.Settle_Button();

    })
})