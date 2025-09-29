const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { AM_Assetdisposal } = require('/Medyaanbeg/Audit_Manager/Audit_AM_Assetdisposal');
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
    const data = readExcel("C:/Medyaanbeg/TestData/Audit_manager.xlsx", "Audit_AM_Assetdisposal");

    test('TC001 - AM_AssetDisposal', async ({ page }) => {
        const { ID, Assetname, Search } = data[0];

        const Asset = new AM_Assetdisposal(page);
        await Asset.Select_AssetModule()
        await Asset.ViewAsset(ID, Assetname)
        await Asset.BackArrow()
        await Asset.Search(Search)
        await Asset.ViewAsset("",Assetname)









    });

});

