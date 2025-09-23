const { test, expect } = require('./Custom_test');
import { Homepage } from "../Asset_manager/Loginpage";


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
