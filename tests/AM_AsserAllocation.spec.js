const { test, expect } = require('./Custom_test');
import { Homepage } from "../Asset_manager/Loginpage";
import { AM_Allocation } from "../Asset_manager/AM_AssetAllocation";

  //Login to AssetManager Using Valid Credential.
test.describe.serial('TS01 - AssetManager ', () => {

  test("TC001 - Login Page", async ({Page}) => {
    const Login = JSON.parse(JSON.stringify(require('../Utils/LoginPageUtils.json')));
    const { Url } = Login[0];
    const { UserName, Password } = Login[1];

    const Launch = new Homepage(Page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);

  });
});
test.describe.serial('TS03 - AssetAllocation ', () => {

  const Asset = JSON.parse(JSON.stringify(require('../Utils/AssetAllocationUtils.json')));
  //select Asset_Allocation Module from Asset_Management Menu.
  test("TC005 - Select_AssetAllocation", async ({ Page }) => {
    const Allocation = new AM_Allocation(Page);
    await Allocation.Select_AssetModule();
  });

  //Check buttons function in Add_AssetAllocation page(AddAssetAllocation, BackArrow, Cancel and Submit) 
  test("TC006 - Add_AssetAllocation", async ({ Page }) => {

    const { assetlocator } = Asset[0];
    const Allocation = new AM_Allocation(Page);
    await Allocation.addAssetllocation(`${assetlocator}`);
  })

  //Create a Asset with Valid Credential
  test("TC007 - CreateAssetAllocation", async ({ Page }) => {

    const Allocation = new AM_Allocation(Page);
    await Allocation.createAssetAllocation();

  })

  //Check Switch Tabs and Action functionalities(View ,Edit & Delete) 
  test("TC008 - AM_assetAllocation_tabHandle ", async ({ Page }) => {

    const { assetCode } = Asset[0];

    const Tabs = new AM_Allocation(Page);
    await Tabs.Tab_handel(`${assetCode}`);
  });

});