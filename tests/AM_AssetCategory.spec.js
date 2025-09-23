const { test, expect } = require('./Custom_test');
import { Homepage } from "../Asset_manager/Loginpage";
import { AM_AssetCategory } from "../Asset_manager/AM_AssetCategory";

test.describe.serial('TS01 - AssetManager ', () => {

  test("TC001 - Login Page", async ({ Page }) => {
    const Login = JSON.parse(JSON.stringify(require('../Utils/LoginPageUtils.json')));
    const { Url } = Login[0];
    const { UserName, Password } = Login[1];

    const Launch = new Homepage(Page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});  
test.describe.serial('TS02 - AssetCategory ', () => {

  //select Asset_Allocation Module from Asset_Management Menu.
  test("TC002 - Select_AssetAllocation", async ({Page}) => {
    const Category = new AM_AssetCategory(Page);
    await Category.Select_AssetModule();  
  });
  test.skip("TC003 - Click_AddAssetCategory", async ({ Page }) => {
    const Category = new AM_AssetCategory(Page);
    await Category.Click_AddAssetCategory();  
  });
  test.skip("TC004 - Create_AddAssetCategory", async ({ Page }) => {
    const Category = new AM_AssetCategory(Page);
    await Category.CreateAssetCategory();  
  });
  test("TC005 - ActionFields", async ({ Page }) => {
    const Category = new AM_AssetCategory(Page);
    await Category.ActionFields();  
  });
});


