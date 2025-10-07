const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Proforma } = require('/Medyaanbeg/Methods/Shopkeeper/Proforma');
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
test.describe.serial('TS02 - Dashboard_PaymentPending', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Proforma");

    test.skip('TC001 -  Create Proforma with Valid Credential', async ({page}) => {
        const { Customer_Name, Pet_Name, SearchMaterial, Quantity, date, Month, Year } = data[0];
        const Profm = new Proforma(page);

        await Profm.Click_Proforma();
        await Profm.Search_Customer(Customer_Name);
        await Profm.Search_Pet(Pet_Name);
        await Profm.Search_Material(SearchMaterial);
        await Profm.Quantity(Quantity);
        await Profm.Duedate(date, Month, Year);
        await Profm.Add_button();
        await Profm.CreateProforma_Yes();

    });
    test.skip('TC002 -Create and Edit Proforma', async ({ page }) => {
        const { Customer_Name, Pet_Name, SearchMaterial, Quantity1, Quantity2, date, Month, Year } = data[0];
        const Profm = new Proforma(page);
        await Profm.Click_Proforma();
        await Profm.Search_Customer(Customer_Name);
        await Profm.Search_Pet(Pet_Name);
        await Profm.Search_Material(SearchMaterial);
        await Profm.Quantity(Quantity1);
        await Profm.Duedate(date, Month, Year);
        await Profm.Add_button();
        await Profm.Edit_Material();
        await Profm.Quantity(Quantity2);
        await Profm.Add_button();
        await Profm.CreateProforma_Yes();

    });
    test.skip('TC002 - Create Multiple Proforma', async ({ page }) => {
        // Loop through the data array and execute the same steps for each index
        const { Customer_Name, Pet_Name, date, Month, Year } = data[0];
        const Profm = new Proforma(page);

        await Profm.Click_Proforma();
        await Profm.Search_Customer(Customer_Name);
        await Profm.Search_Pet(Pet_Name)
        await Profm.Duedate(date, Month, Year);

        for (let i = 0; i < data.length; i++) {
            const { SearchMaterial, Quantity1 } = data[i];

            // Perform the actions for each iteration
            await Profm.Search_Material(SearchMaterial);
            await Profm.Quantity(Quantity1);
            await Profm.Add_button();
        }
        await Profm.CreateProforma_Yes();

    });
    test('TC005 - Goto History Page from Invoice Page', async ({ page }) => {
        const Profm = new Proforma(page);

        await Profm.Click_Proforma();

        await Profm.History_Button();
        await Profm.XIcon();


    });
    test('TC006 - Goto Invoice Page and Get Back to Dashboard page', async ({ page }) => {
        const Profm = new Proforma(page);

        //await Profm.Click_Proforma();

        await Profm.Dashboard_Button();
        await Profm.ConfirmYes()

    });

    test('TC007 - Goto Invoice Page and Logout', async ({ page }) => {
        const Profm = new Proforma(page);

        await Profm.Click_Proforma();

        await Profm.Logout_Button();
        await Profm.ConfirmYes();

    });

});