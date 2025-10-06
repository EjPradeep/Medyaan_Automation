const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { CompliancePolicy } = require('/Medyaanbeg/Audit_Manager/CompliancePolicy');
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
    const data = readExcel("C:/Medyaanbeg/TestData/Audit_Manager.xlsx", "CompliancePolicy");

    test('TC001 - Compliance Policy', async ({ page }) => {
        const { AssetName , TaskName } = data[0];

        const Policy = new CompliancePolicy(page);
        await Policy.CompliancePolicy()
        
        await Policy.ViewPolicy(AssetName, TaskName)
        await Policy.BackArrow()

    
    });

});

