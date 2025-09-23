const { test, expect } = require('./Custom_test');
import { AssetPolicy } from "../Asset_manager/AssetPolicy";
import { Homepage } from "../Asset_manager/Loginpage";





//Login to AssetManager Using Valid Credential.
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


test.describe.serial("TS02 - AssetPolicy ", () => {

  test("TC002 - Select_AssetMovement", async ({ Page }) => {

    let Policy = new AssetPolicy(Page);
    await Policy.Select_AssetModule();
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
















