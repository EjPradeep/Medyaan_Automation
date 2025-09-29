const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Noti_lang } = require('/Medyaanbeg/Common_Operation/Lang_Noti');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



test.describe.serial('TS01 - AssetManager ', () => {
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

    //  test.setTimeout(120000);
    test("TC001 - Login Page", async ({ page }) => {
        const { Url, UserName, Password } = data[0];

        const Launch = new Homepage(page);
        await Launch.Launchpage(Url);
        await Launch.Signin(UserName, Password);
    });

});
test.describe.serial('TS02 - Language & Notification', () => {
    //test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Language&Notification");

    test('TC002 - Language', async ({ page }) => {
        const { ChooseLang } = data[0];

        const Lang = new Noti_lang(page);
        await Lang.Language(ChooseLang);
    });



    test('TC003 - Notification', async ({ page }) => {

        const Noti = new Noti_lang(page);
        await Noti.Notifications();
        await Noti.AllNotification();

        await Noti.UnreadNotification();

        await Noti.ReadNotification();

        await Noti.CancelIcon();

        await page.waitForTimeout(2000);


    });



});
