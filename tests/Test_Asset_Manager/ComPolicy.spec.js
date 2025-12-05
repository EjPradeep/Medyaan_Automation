const { test, expect } = require('/Medyaanbeg/tests/Custom_test');
const { Homepage } = require("/Medyaanbeg/Methods/Common_Operation/Loginpage")
const { CompliancePolicy } = require("/Medyaanbeg/Methods/Asset_manager/CompliancePolicy")
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');
test.setTimeout(120000);

test.describe('TS01 - AssetManager ', () => {

  const data = readExcel("TestData/Common_Operation.xlsx", "Login");

  test("TC001 - Login page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
});


test.describe("TS02 - CompliancePolicy ", () => {
  const data = readExcel("TestData/Assetmanager.xlsx", "CompliancePolicy");

  test("TC001 - Create Asset Policy with Recurrence in weekdays", async ({ page }) => {
    const { Taskname, Project, AssetName, AuditRequired, PlannedHours, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description,
      FortNight1, FortNight2, Week, Month_date, Year_month, Year_date } = data[0]
    const Policy = new CompliancePolicy(page);
    await Policy.Select_CompliancePolicy()
    await Policy.CreateCompliancePolicy(Taskname, Project, AssetName, AuditRequired, StartHrs, StartMins, EndHrs, EndMins,
      Recurrence, FortNight1, FortNight2, Week, Month_date, Year_month, Year_date,
      StartDate, StartMonth, StartYear, EndDate, EndMonth, EndYear, Description)
    await Policy.Submit()
    await Policy.ConfirmYes()

  })
  // test.skip("TC002 - Click_AddCompliancePolicy", async ({ Page }) => {

  //   let Policy = new CompliancePolicy(Page);
  //   await Policy.Click_AddCompliancePolicy();
  // })
  // test.skip("TC003 - CreateCompliancePolicy", async ({ Page }) => {

  //   let Policy = new CompliancePolicy(Page);
  //   await Policy.CreateCompliancePolicy();

  // })
  // test.skip("TC004 - Edit_AddCompliancePolicy", async ({ Page }) => {

  //   let Policy = new CompliancePolicy(Page);
  //   await Policy.View_CompliancePolicy();
  //   await Policy.Edit_CompliancePolicy();
  //   await Policy.delete_CompliancePolicy();




  // })


})
















