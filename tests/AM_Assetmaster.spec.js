const { test, expect } = require('./Custom_test');
import { Homepage } from "../Asset_manager/Loginpage";
import { AM_Assetmaster } from "../Asset_manager/AM_AssetMaster";

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

test.describe.serial('TS02 - AssetMaster ', () => {
  //Check buttons function in Add_Asset page(AddAsset, BackArrow, Cancel and Submit) 
  test("TC002 - Click_AddAsset", async ({ Page }) => {
    const asset = new AM_Assetmaster(Page);
    //await asset1.ClickAction();

    await asset.click_addAsset();
    await Page.waitForTimeout(2000)


  })
  //Create a Asset with Valid Credential
  test("TC003 - CreateAsset", async ({ Page }) => {
    const Asset = JSON.parse(JSON.stringify(require('../Utils/AssetMasterUtils.json')));
    const { assetname, assetCode, purchaseAmount, ImagePath } = Asset[0];
    const asset = new AM_Assetmaster(Page);
    await asset.createAsset(assetname, assetCode);
    await asset.createAsset_Categ(`${purchaseAmount}`);
    await asset.imageUpload(ImagePath);
  });

  test("TC004 - AM_assetMaster_tabHandle ", async ({ Page }) => {
    const Asset = JSON.parse(JSON.stringify(require('../Utils/AssetMasterUtils.json')));
    const { assetCode } = Asset[0];
    const Tabs = new AM_Assetmaster(Page);
    await Tabs.Tab_handel(`${assetCode}`);

  });
})

