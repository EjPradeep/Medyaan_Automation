const { test, expect } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AM_AssetCategory } = require("/Medyaanbeg/Methods/Asset_manager/AM_AssetCategory")
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
test.describe.serial('TS02 - AssetCategory ', () => {
  const data = readExcel("TestData/Assetmanager.xlsx", "AssetCategory");

  //select Asset_Category Module from Asset_Management Menu.
  test("TC002 - Create_AssetCategory with Valid Credential", async ({ page }) => {

    const { AssetCategory, Description } = data[4]
    const Category = new AM_AssetCategory(page);

    await Category.Select_AssetCategory();
    await Category.CreateAssetCategory(AssetCategory, Description);
    await Category.Submit();
    await Category.ConfirmYes();
  });
  test("TC003 - Create_AssetCategory with invalid Credential", async ({ page }) => {
    const Category = new AM_AssetCategory(page);
    await Category.AddCategory_Button();
    await Category.Submit();
    await expect(Category.errorMessage).toContainText('Asset Category is required');
    await Category.BackArrow();
  });
  test("TC004 - Create with Valid Credential and Click Cancel ", async ({ page }) => {
    const { AssetCategory, Description } = data[0]
    const Category = new AM_AssetCategory(page);

    await Category.CreateAssetCategory(AssetCategory, Description);
    await Category.Cancel();
    await Category.ConfirmYes();

  });
  test("TC005 - Create_AssetCategory with Already Excisting Credential", async ({ page }) => {
    const { AssetCategory, Description } = data[0]
    const Category = new AM_AssetCategory(page);

    await Category.CreateAssetCategory(AssetCategory, Description);
    await Category.Submit();
    await expect(Category.errorMessage).toContainText('Asset Category already exists');
    await Category.BackArrow();

  });

  test("TC006 - View the Created Asset Category ", async ({ page }) => {
    const { AssetCategory } = data[0]
    const Category = new AM_AssetCategory(page);
 //   await Category.Select_AssetCategory();
    await Category.View_Category(AssetCategory);
    await Category.BackArrow();
  });
  test("TC007 - Edit the Created Asset Category", async ({ page }) => {
    const { AssetCategory } = data[3]
    const {  Description } = data[4]
    const Category = new AM_AssetCategory(page);
    await Category.Edit_Category(AssetCategory);
    await Category.Description(Description)
    await Category.Submit();
    await Category.ConfirmYes();

  });
    test("TC008 - Delete an Created Asset Category", async ({ page }) => {
    const { AssetCategory } = data[0]
    const Category = new AM_AssetCategory(page);
   // await Category.Select_AssetCategory();
    await Category.Delete_Category(AssetCategory);
    await Category.ConfirmYes();
  });

  test.skip("TC009 - Delete All Created Asset Category", async ({ page }) => {
    const Category = new AM_AssetCategory(page);
   
    for (let i = 0; i < data.length; i++) {
      const { AssetCategory } = data[i];

      await Category.Delete_Category(AssetCategory);
      await Category.ConfirmYes();
    }
  });
});

