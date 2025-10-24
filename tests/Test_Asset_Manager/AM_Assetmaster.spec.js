const { test } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AM_Assetmaster } = require("/Medyaanbeg/Methods/Asset_manager/AM_AssetMaster")
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');


test.describe.serial('TS01 - AssetManager ', () => {

  const data = readExcel("TestData/Common_Operation.xlsx", "Login");

  test("TC001 - Login Page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});

test.describe.serial('TS02 - AssetMaster ', () => {

  const data = readExcel("TestData/Assetmanager.xlsx", "AssetMaster");

  test.skip("TC002 - Create Asset", async ({ page }) => {
    const { AssetName, AssetCode, Category, PurchaseAmount, Pur_date, Pur_month, Pur_year, ImagePath } = data[1];

    const asset = new AM_Assetmaster(page);
    await asset.CreateAsset(AssetName, AssetCode, Category, PurchaseAmount, Pur_date, Pur_month, Pur_year, ImagePath);
  });
   test.skip("TC003 - View an Asset", async ({ page }) => {
    const { AssetID,AssetName, AssetCode } = data[0];

    const asset = new AM_Assetmaster(page);
    await asset.View_AssTab(AssetID, AssetName, AssetCode,);
    await asset.BackArrow()
  });
     test("TC004 - View an Edit", async ({ page }) => {
    const { AssetID,AssetName, AssetCode } = data[0];

    const asset = new AM_Assetmaster(page);
    await asset.Edit_Asset(AssetID, AssetName, AssetCode,);
  });
});
