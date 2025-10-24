const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Settlement } = require('/Medyaanbeg/Methods/ExternalManager/MM_Settlement');
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
    const data = readExcel("C:/Medyaanbeg/TestData/ExternalManager.xlsx", "MM_Settlement");

    test('TC001 -  Goto MM_Settlement Page and Settle', async ({ page }) => {
        const { Settle_ID, Settle_Name, Product_Name, Amount, Filter, Search } = data[0];

        const Settle = new Settlement(page);

        await Settle.Select_Module()
        await Settle.PendingTab()
        await Settle.Filter(Filter);
        await Settle.Search(Search);
        await Settle.AllCheckbox()
        await Settle.Settle_Button();

    })
})