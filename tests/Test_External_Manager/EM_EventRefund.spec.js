const { test } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require('/Medyaanbeg/Methods/Common_Operation/Loginpage');
const { EventRefund } = require('/Medyaanbeg/Methods/ExternalManager/EM_EventRefund');
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
    const data = readExcel("C:/Medyaanbeg/TestData/ExternalManager.xlsx", "MM_EventRefund");

    test('TC001 -  Goto EM_EventRefund Page and Settle', async ({ page }) => {
        const { Cus_ID, Cus_Name, Event_Name, Amount} = data[0];

        const EvRef = new EventRefund(page);

        await EvRef.Select_Module()
        await EvRef.PendingTab()
        await EvRef.Checkbox(Cus_ID,Cus_Name,Event_Name,Amount)
        await EvRef.Settle_Button();

    })
})