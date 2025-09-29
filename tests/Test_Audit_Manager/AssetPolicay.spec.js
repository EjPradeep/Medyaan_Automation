const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { AssetPolicy } = require('/Medyaanbeg/Audit_Manager/AssetPolicy');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



test.describe.serial('TS01 - AuditManager ', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

    //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);
    });
});
test.describe.serial('TS02 - AuditManager', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Audit_Manager.xlsx", "AssetPolicy");

    test('TC001 - AM_AssetDisposal', async ({ page }) => {
        const { AssetName , TaskName } = data[0];

        const Policy = new AssetPolicy(page);
        await Policy.AssetPolicy()
        await Policy.ViewPolicy(AssetName, TaskName)
        await Policy.BackArrow()

    
    });

});

