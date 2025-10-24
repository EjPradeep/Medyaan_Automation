const { test } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AM_AssetMovement } = require("/Medyaanbeg/Methods/Asset_manager/AM_AssetMovement")
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');

test.describe.serial('TS01 - AssetManager ', () => {

  const data = readExcel("TestData/Common_Operation.xlsx", "Login");

  test("TC001 - Login Page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});

test.describe.serial("TS04 - AssetMovement", () => {
  const data = readExcel("TestData/Assetmanager.xlsx", "AssetMovement");

  //select Asset_Movement Module from Asset_Management Menu.
  test.skip("TC002 - Create AssetMovement in External", async ({ page }) => {
    const { AssetName, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType, DestinationRoom, ExternalDestination, ReturnDate, ReturnMonth, ReturnYear, Purpose, GatePass } = data[0];

    const Movement = new AM_AssetMovement(page);
    await Movement.Select_AssetMovement();
    await Movement.CreateMovement(AssetName, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType, DestinationRoom, ExternalDestination, ReturnDate, ReturnMonth, ReturnYear, Purpose, GatePass);
    await Movement.Submit();
    await Movement.ConfirmYes();

  })

  test.skip("TC003 - Create AssetMovement in Internal", async ({ page }) => {
    const { AssetName, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType, DestinationRoom, ExternalDestination, ReturnDate, ReturnMonth, ReturnYear, Purpose, GatePass } = data[1];

    const Movement = new AM_AssetMovement(page);
    await Movement.Select_AssetMovement();
    await Movement.CreateMovement(AssetName, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType, DestinationRoom, ExternalDestination, ReturnDate, ReturnMonth, ReturnYear, Purpose, GatePass);
    await Movement.Submit();
    await Movement.ConfirmNo();

  })

  //Create a Asset with Valid Credential
  test("TC004 - Complete the Asset in Maintenance Status", async ({ page }) => {
    const { UserName, AssetName, AssetCode, MovementType, TransferType, CreatedDate, Reason } = data[2];

    const Movement = new AM_AssetMovement(page);
    await Movement.Select_AssetMovement();
    await Movement.Search(AssetCode);
    await Movement.Complete_Maintenance(UserName, AssetName, AssetCode, MovementType, TransferType, CreatedDate, Reason);

  })

  //Check Switch Tabs and Action functionalities(View ,Edit & Delete) 
  test.skip("TC005 - AssetMovement_TabHandle ", async ({ page }) => {

    const Tabs = new AM_AssetMovement(page);
    await Tabs.Tab_handel();
  });


});





