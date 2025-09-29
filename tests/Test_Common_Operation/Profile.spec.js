const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const { Profile } = require('/Medyaanbeg/Common_Operation/Profile');
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

test.describe.serial('TS02 - Profile ', () => {
  const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Profile");

  //  test.setTimeout(120000);
  test("TC002 - Edit Profile", async ({ page }) => {
    const { Firstname, Lastname, Gender, Date, Month, Year, 
      Language, MobileNo, Email, 
      Marital, EmergencyCon, Address, EmiratesId, TRNno, Emirate,     
      uploadPhotoPath, IdProofPath, OtherDocumentsPath,} = data[0];
    const profile = new Profile(page);
   
    await profile.Profileclick();
    await profile.Edit();

    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    await profile.Gender(Gender);
    await profile.Language(Language);
    await profile.Mobile(MobileNo);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Emergency(EmergencyCon);
    await profile.Address(Address);
    await profile.EmirateID(EmiratesId);
    await profile.Emirate(Emirate);
    await profile.TRNno(TRNno);
    await profile.upload_IdProof(IdProofPath);
    await profile.upload_OtherDocuments(OtherDocumentsPath);
    await profile.Submit();
    await profile.ConfirmYes();


  });
});




