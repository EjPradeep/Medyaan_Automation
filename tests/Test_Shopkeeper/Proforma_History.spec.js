const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const {Prof_History } = require('/Medyaanbeg/Methods/Shopkeeper/ProformaHistory');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



test.describe.serial('TS01 - Shopkeeper ', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

    //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);
    });
});
test.describe.serial('TS02 - Proforma History', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Proforma");

    test('TC001 -  Goto History page from Proforma by clicking History Button', async ({page}) => {
        const { Customer_Name, Pet_Name, SearchMaterial, Quantity, date, Month, Year } = data[0];
        const Profm = new Prof_History(page);

        await Profm.Click_Proforma();
        await Profm.Search_Customer(Customer_Name);
      

    })
})