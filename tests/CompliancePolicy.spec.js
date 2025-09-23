const { test, expect } = require('./Custom_test');
import {CompliancePolicy} from "../Asset_manager/CompliancePolicy";
import { Homepage } from "../Asset_manager/Loginpage";





//Login to AssetManager Using Valid Credential.
test.describe.serial('TS01 - AssetManager ', () => {
test.setTimeout(120000);
  test("TC001 - Login Page", async ({ Page }) => {
    const Login = JSON.parse(JSON.stringify(require('../Utils/LoginPageUtils.json')));
    const { Url } = Login[0];
    const { UserName, Password } = Login[1];

    const Launch = new Homepage(Page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);

  });
});


test.describe.serial("TS02 - CompliancePolicy ", () => {
 test.setTimeout(120000);
  test("TC002 - Select_AssetMovement", async ({ Page }) => {

    let Policy = new CompliancePolicy(Page);
    await Policy.Select_AssetModule();
  })
  test.skip("TC002 - Click_AddCompliancePolicy", async ({ Page }) => {

    let Policy = new CompliancePolicy(Page);
    await Policy.Click_AddCompliancePolicy();
  })
  test("TC003 - CreateCompliancePolicy", async ({ Page }) => {

    let Policy = new CompliancePolicy(Page);
    await Policy.CreateCompliancePolicy();
 
  })
  test("TC004 - Edit_AddAssetPolicy", async ({ Page }) => {

    let Policy = new CompliancePolicy(Page);
    await Policy.View_CompliancePolicy();
    await Policy.Edit_CompliancePolicy();
    await Policy.delete_CompliancePolicy();
    
    
    
 
  })


})
















