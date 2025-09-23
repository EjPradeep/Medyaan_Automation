const { test, expect } = require('./Custom_test');
import { Homepage } from "../Asset_manager/Loginpage";
import { AM_AssetDisposal } from "../Asset_manager/AM_AssetDisposal";

test.describe.serial('TS01 - AssetDisposal ', () => {

  test("TC001 - Login Page", async ({ Page }) => {
    const Login = JSON.parse(JSON.stringify(require('../Utils/LoginPageUtils.json')));
    const { Url } = Login[0];
    const { UserName, Password } = Login[1];

    const Launch = new Homepage(Page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});
test.describe.serial("TS02 - AssetDisposal", () => {

  test("TC002 - Select_AssetDisposal", async ({ Page }) => {
    const Movement = new AM_AssetDisposal(Page);
    await Movement.Select_AssetModule();
  });
  test.skip("TC003 - Click_AddAssetDisposal", async ({ Page }) => {
    const Movement = new AM_AssetDisposal(Page);
    await Movement.Click_AddAssetDisposal();});

test("TC003 - Create_AssetDisposal", async({Page})=>{

  const Disposal=new AM_AssetDisposal(Page);
  await Disposal.createAssetDisposal();



})
  
  


})