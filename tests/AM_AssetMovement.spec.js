const { test, expect } = require('./Custom_test');
import { AM_AssetMovement } from "../Asset_manager/Am_AssetMovement";
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

test.describe.serial("TS04 - AssetMovement", () => {

  //select Asset_Movement Module from Asset_Management Menu.
  test("TC002 - Select_AssetMovement", async ({ Page }) => {
    const Movement = new AM_AssetMovement(Page);
    await Movement.Select_AssetModule();
  })

  //Check buttons function in Add_Movement Page (Add_Movement, BackArrow, Cancel & Submit) 
  test("TC003 - Click_AddAssetMovement", async ({ Page }) => {

    const Movement = new AM_AssetMovement(Page);
    await Movement.Click_AddAssetMovement();
  })

  //Create a Asset with Valid Credential
  test("TC004 - Create_AddAssetMovement", async ({ Page }) => {

    const Movement = new AM_AssetMovement(Page);
    await Movement.createAssetMovement();
  })

  //Check Switch Tabs and Action functionalities(View ,Edit & Delete) 
  test("TC005 - AssetMovement_TabHandle ", async ({ Page }) => {

    const Tabs = new AM_AssetMovement(Page);
    await Tabs.Tab_handel();
  });


});





