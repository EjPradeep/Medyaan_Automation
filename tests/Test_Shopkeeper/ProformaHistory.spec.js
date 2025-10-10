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
test.describe.serial('TS02 - Proforma_History', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "_History");

    test.skip('TC001 -  Goto Prof_History page from Proforma by clicking History Button', async ({page}) => {
        const { Customer_Name, Pet_Name,Search } = data[0];

        const Profm_his = new Prof_History(page);

        await Profm_his.Click_Proforma();
        await Profm_his.History_Button();
        await Profm_his.Search(Search);
        await Profm_his.View_Proforma(Customer_Name,Pet_Name);
        await Profm_his.Back_Button();   

    })
        test('TC002 -  Goto Bill page and Print', async ({page}) => {
        const { Customer_Name, Pet_Name,Search } = data[0];

        const Profm_his = new Prof_History(page);

        await Profm_his.Click_ProformaHistory();
        await Profm_his.Search(Search);
        await Profm_his.View_Proforma(Customer_Name,Pet_Name);
        await Profm_his.Bill_Button();   
      //  await Profm_his.Print_Button();   


    })
     test('TC003 -  Goto History page and Select Current Date', async ({page}) => {
        const { Customer_Name, Pet_Name,Search } = data[0];

        const Profm_his = new Prof_History(page);

        await Profm_his.Click_ProformaHistory();
        await Profm_his.Search(Search);
        await Profm_his.View_Proforma(Customer_Name,Pet_Name);
        await Profm_his.Bill_Button();   
      //  await Profm_his.Print_Button();   


    })
})