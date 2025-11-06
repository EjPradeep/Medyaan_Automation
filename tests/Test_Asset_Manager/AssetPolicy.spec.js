const { test, expect } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { AssetPolicy } = require("/Medyaanbeg/Methods/Asset_manager/AssetPolicy")
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');
test.setTimeout(120000);

test.describe.serial('TS01 - AssetManager ', () => {

  const data = readExcel("TestData/Common_Operation.xlsx", "Login");

  test("TC001 - Login page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});


test.describe.serial("TS02 - AssetPolicy ", () => {
  const data = readExcel("TestData/Assetmanager.xlsx", "AssetPolicy");

  test.skip("TC001 - Create Asset Policy with Recurrence in weekdays", async ({ page }) => {
    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description,
      FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[0]
    const Policy = new AssetPolicy(page);
    await Policy.Select_AssetPolicy()
    await Policy.CreateAssetPolicy(Taskname, Project, AssetName, AuditRequired, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date,
      StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description)
    await Policy.Submit()
    await Policy.ConfirmYes()


  })
  test.skip("TC002 - Create Asset Policy with Recurrence in weekend", async ({ page }) => {

    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth,
      EndYear, Description, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[1]
    const Policy = new AssetPolicy(page);
    await Policy.Select_AssetPolicy()
    await Policy.CreateAssetPolicy(Taskname, Project, AssetName, AuditRequired, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date,
      StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description)
    await Policy.Submit()
    await Policy.ConfirmYes()

  })
  test.skip("TC003 - Create_AddAssetPolicy with Recurrence in Fortnight", async ({ page }) => {
    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description,
      FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[2]
    let Policy = new AssetPolicy(page);
    await Policy.Select_AssetPolicy()
    await Policy.CreateAssetPolicy(Taskname, Project, AssetName, AuditRequired, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date,
      StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description)
    await Policy.Submit()
    await Policy.ConfirmYes()
  })

  test.skip("TC004 - Create_AddAssetPolicy with Recurrence in Week", async ({ page }) => {

    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear,
      Description, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[3]
    let Policy = new AssetPolicy(page);
    await Policy.Select_AssetPolicy()
    await Policy.AddAssetPolicy_Button()
    await Policy.TaskName(Taskname)
    await Policy.Project(Project)
    await Policy.AssetName(AssetName)
    await Policy.AuditRequired(AuditRequired)
    await Policy.Plannedhours(PlannedHours)
    await Policy.StartTime(StartHrs, StartMins)
    await Policy.EndTime(EndHrs, EndMins)
    await Policy.Recurrence(Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date)
    await Policy.Date(StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear)
    await Policy.Description(Description)
    await Policy.Submit()
    await Policy.ConfirmYes()



  })

  test.skip("TC005 - Create_AddAssetPolicy with Recurrence in Month", async ({ page }) => {
    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description,
      FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[4]
    let Policy = new AssetPolicy(page);
    await page.reload()
    await Policy.CreateAssetPolicy(Taskname, Project, AssetName, AuditRequired, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date,
      StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description)
    await Policy.Submit()
    await Policy.ConfirmYes()
  })

  test("TC006 - Create_AddAssetPolicy with Recurrence in Year", async ({ page }) => {

    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear,
      Description, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[5]
    let Policy = new AssetPolicy(page);
    await Policy.Select_AssetPolicy()
    await Policy.AddAssetPolicy_Button()
    await Policy.TaskName(Taskname)
    await Policy.Project(Project)
    await Policy.AssetName(AssetName)
    await Policy.AuditRequired(AuditRequired)
    await Policy.Plannedhours(PlannedHours)
    await Policy.StartTime(StartHrs, StartMins)
    await Policy.EndTime(EndHrs, EndMins)
    await Policy.Date(StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear)
    await Policy.Recurrence(Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date)
    await Policy.Description(Description)
    await Policy.Submit()
    await Policy.ConfirmYes()

  })
})
















