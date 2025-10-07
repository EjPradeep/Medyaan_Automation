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
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Dashboard_IP");

    test('TC001 - View IP Appointment Details and Go to Create Invoice Page', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number } = data[0];
        const IP = new Dashboard(page);
        await IP.IP_Tab()
        await IP.View_Appointment(Customer_Name, Pet_Name, Customer_Number);
        await IP.CreateInvoice_Button()
        await IP.Dashboard_Button()
        await IP.ConfirmYes()
    });
    test('TC002 - View IP Appointment Details then Go to Create Invoice Page and Logout', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number } = data[0];
        const IP = new Dashboard(page);
        await IP.IP_Tab()
        await IP.Invoice_Button(Customer_Name, Pet_Name, Customer_Number);
        await IP.History_Button();
        await IP.XIcon();

    });
    test.skip('TC003 - View IP Appointment Details then Go to Create Invoice Page and Logout', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number } = data[0];
        const IP = new Dashboard(page);
        await IP.IP_Tab()
        await IP.View_Appointment(Customer_Name, Pet_Name, Customer_Number);
        await IP.CreateInvoice_Button()
        await IP.Logout_Button()
        await IP.ConfirmYes()
    });
})