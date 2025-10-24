const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { EventSettlement } = require('/Medyaanbeg/Methods/ExternalManager/EM_EventSettlement');
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
    const data = readExcel("C:/Medyaanbeg/TestData/ExternalManager.xlsx", "EM_EventSettlement");

    test('TC001 -  Goto EM_StallSettlement Page and Settle', async ({ page }) => {
        const { Cus_ID, Cus_Name, Event_Name, Amount } = data[0];

        const Evesettle = new EventSettlement(page);

        await Evesettle.Select_Module()
        await Evesettle.PendingTab()
        await Evesettle.Checkbox(Cus_ID,Cus_Name,Event_Name,Amount)
        await Evesettle.Settle_Button();

    })
})