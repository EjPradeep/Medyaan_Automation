const { test } = require('./Custom_test');
import { Taskmanage } from "../Asset_manager/TM_Managetask";
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
  test.use({
    permissions: ['geolocation'],
    geolocation: { latitude: 12.9716, longitude: 77.5946 },
  });
});

test.describe.serial("TS02 - TaskManagement ", () => {
  test.setTimeout(120000);
  test("TC002 - ManageTask", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    await Task.Select_AssetModule();
  })

  test.skip("TC003 - Filter", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    await Task.Filter_Task();
    // await Task.Filter_Cancel();
    await Task.Search();
    await Task.SearchClear();
  })
  test.skip("TC004 - Create Task", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    //await Task.createTask();
    await Task.clickAddTask();
    await Task.TaskTitle();
    await Task.Project();
    await Task.SubmitTask();
    await Task.ConfirmYes();


  })
  test.skip("TC005 - View Task", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    await Task.ClickProject();
    await Task.ClickTask();
    await Task.EditTask();
    await Task.Assigned_To();
    await Task.CancelEditTask();
    await Task.ConfirmYes();
    await Task.EditTask();
    await Task.Assigned_To();
    await Task.SaveEditTask();
    await Task.ConfirmYes();
    

  })
  test.skip("TC006 - Edit Task", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    await Task.ClickProject();
    await Task.ClickTask();

    await Task.Note();
    await Task.ImageUpload();
    await Task.AddNote();
    await Task.ConfirmYes();
  })
  test.skip("TC007 - Task Stage Move", async ({ Page }) => {

    let Task = new Taskmanage(Page);
    await Task.ClickProject();
    await Task.ClickTask();
    await Task.NextStage();
    await Task.page.waitForTimeout(500);
    await Task.ConfirmYes();
    await Task.page.waitForTimeout(500);
    await Task.ClickTask();
    await Task.page.waitForTimeout(500);
    await Task.PrevStage();
    await Task.page.waitForTimeout(500);
    await Task.ConfirmYes();
    await Task.page.waitForTimeout(2000);

  })
  test("TC008 - Add Consumption", async ({ Page }) => {

    let Task = new Taskmanage(Page);

    await Task.ClickProject();
    await Task.ClickTask();
    await Task.page.waitForTimeout(500);
    await Task.SelectTaskTab();
    await Task.page.waitForTimeout(500);
    await Task.CreateCons();
    await Task.page.waitForTimeout(500);
    await Task.SearchCons();
    await Task.page.waitForTimeout(500);
    await Task.Batch();
    await Task.page.waitForTimeout(500);
    await Task.Quantity();
    await Task.page.waitForTimeout(500);
    await Task.addcons.click();
    await Task.page.waitForTimeout(2000);
    await Task.SaveEditTask
    //await Task.CancelCons();
    //await Task.ConfirmYes();
  })
  test.skip("TC008 - Task Stage Move", async ({ Page }) => {

    let Task = new Taskmanage(Page);

  })


})