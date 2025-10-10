const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { History } = require('/Medyaanbeg/Methods/Shopkeeper/History');
const { Dashboard } = require('/Medyaanbeg/Methods/Shopkeeper/Dashboard');

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
test.describe.serial('TS02 - History', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "_History");

    test.skip('TC001 -  Goto History page and Click Bill button', async ({ page }) => {
        const { Customer_Name, Pet_Name, Search } = data[0];

        const His = new History(page);

        await His.History();
        await His.Shop_Tab();
        await His.Search(Search);
        await His.View_Proforma(Customer_Name, Pet_Name);
        await His.Bill_Button();

    })
    test.skip('TC002 -  Goto History and Return Delivered product', async ({ page }) => {
        const { Customer_Name, Pet_Name, Search, Medicine, ReturnReason, ReturnQuantity } = data[0];

        const His = new History(page);

        await His.History();
        await His.Shop_Tab();
        await His.Search(Search);
        await His.View_Proforma(Customer_Name, Pet_Name);
        await His.Return_Button();
        await His.Return_Quan(Medicine, ReturnQuantity);
        await His.Return_Submit_No();
    })
    test.skip('TC003 -  Goto History and Reorder Delivered product', async ({ page }) => {
        const { Customer_Name, Pet_Name, Search} = data[0];

        const His = new History(page);
        const Dash = new Dashboard(page);


        await His.History();
        await His.Shop_Tab();
        await His.Search(Search);
        await His.View_Proforma(Customer_Name, Pet_Name);
        await His.Reorder_Button();
        await Dash.CreateInvoice_Button();
        await Dash.ConfirmYes();

        
    })
        test('TC004 -  Goto History and Reorder Delivered product', async ({ page }) => {
        const { Customer_Name, Pet_Name, Search, Medicine, ReturnReason, ReturnQuantity } = data[0];
        const {SearchMaterial,Quantity,Delete_Material } = data[1];

        const His = new History(page);
        const Dash = new Dashboard(page);


        await His.History();
        await His.Shop_Tab();
        await His.Search(Search);
        await His.View_Proforma(Customer_Name, Pet_Name);
        await His.Reorder_Button();
        await Dash.Search_Material(SearchMaterial)
        await Dash.Quantity(Quantity)
        await Dash.Add_button();
        await Dash.Delete_Material(Delete_Material)
        await Dash.CreateInvoice_Button()
        
      
    })
})