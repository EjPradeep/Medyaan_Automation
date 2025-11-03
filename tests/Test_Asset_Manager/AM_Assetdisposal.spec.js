const { test } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AM_AssetDisposal } = require("/Medyaanbeg/Methods/Asset_manager/AM_AssetDisposal")
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');
test.setTimeout(120000);

test.describe.serial('TS01 - AssetManager ', () => {

  const data = readExcel("TestData/Common_Operation.xlsx", "Login");

  test("TC001 - Login Page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});

test.describe.serial("TS02 - AssetDisposal", () => {
  const data = readExcel("TestData/Assetmanager.xlsx", "AssetDisposal");

  test.skip("TC002 - Create Assetdisposal with Valid Credential", async ({ page }) => {
    const { AssetName, DisposalMethod, DisposalReason, DisposalValue, Dis_date, Dis_month, Dis_year, Reason } = data[0];
    const disp = new AM_AssetDisposal(page);
    await disp.Select_AssetDisposal();
    await disp.CreateAssetDisposal(AssetName, DisposalMethod, DisposalReason, DisposalValue, Dis_date, Dis_month, Dis_year, Reason);
    await disp.Submit();
    await disp.ConfirmNo();
  });
  test.skip("TC003 - Create Assetdisposal with Invalid Credential", async ({ page }) => {
    const { Reason } = data[1];
    const disp = new AM_AssetDisposal(page);
    await disp.Select_AssetDisposal();
    await disp.AddDisposal();
    await disp.Reason(Reason);
    await disp.Submit();
  });
  test("TC004 - View Disposal Asset", async ({ page }) => {
    const { AssetID, AssetName, AssetCode } = data[2];
    const disp = new AM_AssetDisposal(page);
    await disp.Select_AssetDisposal();
    await disp.View_Disposal(AssetID,AssetName,AssetCode);
    await disp.BackArrow()
    
  });
    test("TC005 - Edit Disposal Asset", async ({ page }) => {
    const { AssetID, AssetName, AssetCode,Dis_date, Dis_month, Dis_year } = data[2];
    const disp = new AM_AssetDisposal(page);
   // await disp.Select_AssetDisposal();
    await disp.Edit_Disposal(AssetID,AssetName,AssetCode,);
    await disp.DisposalDate(Dis_date, Dis_month, Dis_year);
    await disp.Submit();
    await disp.ConfirmYes();
  });
})