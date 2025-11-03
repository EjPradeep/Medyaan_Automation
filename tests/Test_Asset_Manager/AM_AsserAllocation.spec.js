const { test } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AM_Allocation } = require("/Medyaanbeg/Methods/Asset_manager/AM_AssetAllocation")
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

test.describe.serial('TS02 - AssetAllocation ', () => {

  const data = readExcel("TestData/Assetmanager.xlsx", "AssetAllocation");

  test.skip("TC002 - Allocate Asset to a User", async ({ page }) => {
    const { Assetname, User, Area, RoomType, AllocationPurpose, Startdate, Startmonth, Startyear, Enddate, Endmonth, Endyear } = data[1];

    const asset = new AM_Allocation(page);
    await asset.Select_AssetAllocation();
    await asset.CreateAllocation(Assetname, User, Area, RoomType, AllocationPurpose, Startdate, Startmonth, Startyear, Enddate, Endmonth, Endyear);

  });
  test("TC003 - View the Allocated Asset", async ({ page }) => {
    const { User, AssetName, AssetCode } = data[0];

    const asset = new AM_Allocation(page);
    await asset.Select_AssetAllocation();
    await asset.View_AssTab(User, AssetName, AssetCode);
    await asset.BackArrow();
  });
  test.skip("TC004 - Edit the Allocated Asset", async ({ page }) => {
    const { User, AssetName, AssetCode, Filter } = data[0];

    const asset = new AM_Allocation(page);
    await asset.Select_AssetAllocation();
    await asset.UserNameFilter(Filter);
    await asset.Edit_Asset(User, AssetName, AssetCode);
    await asset.BackArrow();



  });

})