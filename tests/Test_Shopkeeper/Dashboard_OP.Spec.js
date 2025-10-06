const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
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
test.describe.serial('TS02 - Dashboard_OP', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Dashboard");

    test.skip('TC001 - View OP Appointment Details and Go to Create Invoice Page', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number, SearchBox,
            SearchMaterial, Batch, Quantity } = data[0];
        const OP = new Dashboard(page);

        await OP.Search(SearchBox);
        await OP.View_Appointment(Customer_Name, Pet_Name, Customer_Number);
        await OP.CreateInvoice_Button()
        await OP.Search_Material(SearchMaterial);
        await OP.Batch(Batch);
        await OP.Quantity(Quantity);
        await OP.Add_button();
    });
    test('TC002 - Click and Go to Create Invoice Page', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number, SearchBox,
            SearchMaterial, Batch, Quantity } = data[0];
        const OP = new Dashboard(page);

        await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.Search_Material(SearchMaterial);
        await OP.Batch(Batch);
        await OP.Quantity(Quantity);
        await OP.Add_button();
    });
    test.skip('TC003 - Goto Create Invoice Page from OP Appointment', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number, SearchBox,
            SearchMaterial, Batch, Quantity, Tick_Material } = data[0];
        const OP = new Dashboard(page);

        await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.Search_Material(SearchMaterial);
        await OP.Batch(Batch);
        await OP.Quantity(Quantity);
        await OP.Add_button();
        await OP.Edit_Material();
        await OP.Add_button();
        await OP.Tick_Material(Tick_Material);
        await OP.Delete_Material();
        await OP.Tick_Material(Tick_Material);


    });

    test.skip('TC004 - Create Invoice with Discount', async ({ page }) => {
        const { Customer_Name, Pet_Name,
            Customer_Number, Coupon
            , Emp_ID } = data[0];
        const OP = new Dashboard(page);

        await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.ClickDiscount();
        await OP.CancelIcon();
        await OP.ApplyDiscount(Coupon);
        await OP.EmployeeID(Emp_ID)
        await OP.RemoveDiscount();

    });
    test.skip('TC005 - Goto History Page from Invoice Page', async ({ page }) => {
        const { Customer_Name, Pet_Name,
            Customer_Number } = data[0];
        const OP = new Dashboard(page);

        await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.History_Button();
        await OP.XIcon();


    });
    test.skip('TC006 - Goto Invoice Page and Get Back to Dashboard page', async ({ page }) => {
    

        //  await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.Dashboard_Button();
        await OP.ConfirmYes()

    });

    test.skip('TC007 - Goto Invoice Page and Logout', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number } = data[0];
      
            const OP = new Dashboard(page);

        await OP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await OP.Logout_Button();
        await OP.ConfirmYes();

    });
});

