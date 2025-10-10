const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Proforma } = require('/Medyaanbeg/Methods/Shopkeeper/Proforma');
const { Dashboard } = require('/Medyaanbeg/Methods/Shopkeeper/Dashboard');
const { Shopdetails } = require('/Medyaanbeg/Methods/Shopkeeper/Shopdetails');

const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');

test.describe.serial('TS01 - Shopkeeper', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

    //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);
    });
});
test.describe.serial('TS02 - Shopdetails', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Shopdetails");

    test('TC001 -  Goto Shop page and Create Invoice', async ({ page }) => {
        const { SelectShop,Customer_Name, Pet_Name, SearchMaterial,Batch, Quantity } = data[0];

        const shop1 = new Proforma(page);
        const shop2 = new Dashboard(page);
        const shop3 = new Shopdetails(page);


        await shop3.Select_Shop(SelectShop);
        await shop1.Search_Customer(Customer_Name);
        await shop2.Search_Material(SearchMaterial);
        await shop2.Batch(Batch);
        await shop2.Quantity(Quantity);
        await shop2.Add_button();
        await shop2.CreateInvoice_Button();
        await shop2.ConfirmYes();
    })
})