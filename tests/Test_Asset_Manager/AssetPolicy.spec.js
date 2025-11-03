const { test, expect } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AssetPolicy } = require("/Medyaanbeg/Methods/Asset_manager/AssetPolicy")
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


test.describe.serial("TS02 - AssetPolicy ", () => {

  test("TC001 - Create Asset Policy", async ({ Page }) => {

    let Policy = new AssetPolicy(Page);
    await Policy.Select_AssetPolicy()
    await Policy.CreateAssetPolicy()

  })
  test.skip("TC002 - Click_AddAssetPolicy", async ({ Page }) => {

    let Policy = new AssetPolicy(Page);
    await Policy.Click_AddAssetPolicy();
  })
  test.skip("TC003 - Create_AddAssetPolicy", async ({ Page }) => {

    let Policy = new AssetPolicy(Page);
    await Policy.CreateAssetPolicy();
 
  })
  test("TC004 - Edit_AddAssetPolicy", async ({ Page }) => {

    let Policy = new AssetPolicy(Page);
    await Policy.Edit_AssetPolicy();
    
 
  })


})
















