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
test.describe.serial('TS02 - Dashboard_PaymentPending', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Shopkeeper.xlsx", "Dashboard_DeliveryPending");

    test('TC001 - View Delivery Pending Details', async ({ page }) => {
        const { Customer_Name, Pet_Name, Customer_Number } = data[0];
        const DeliveryPend = new Dashboard(page);
        await DeliveryPend.Delivery_Pending_Tab()
        await DeliveryPend.View_Appointment(Customer_Name, Pet_Name, Customer_Number);
        await DeliveryPend.Delivery_Button_No()
        await DeliveryPend.Delivery_Button_Yes()
    
    
    }); 
});