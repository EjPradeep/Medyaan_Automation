const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { AM_Assetmaster } = require('/Medyaanbeg/Audit_Manager/Audit_AM_Assetmaster');
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
    const data = readExcel("C:/Medyaanbeg/TestData/Audit_manager.xlsx", "Audit_AM_Assetmaster");

    test('TC001 - AssetRequest', async ({ page }) => {
      const {ID, Assetname, Search} = data[0];

      const Asset = new AM_Assetmaster(page);
      await Asset.Select_AssetModule()
      await Asset.Active_Tab()
      await Asset.Maintanance_Tab()
      await Asset.Disposal_Tab()
      await Asset.All_Tab()
      await Asset.ViewAsset(ID ,Assetname)
      await Asset.ViewMovement()
      await Asset.ViewTask()
      await Asset.ViewAllocation()
      await Asset.BackArrow()
      
    });
  
});

