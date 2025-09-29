const { test } = require('/Medyaanbeg/tests/Custom_test');
import { Homepage } from "/Medyaanbeg/Asset_manager/Loginpage";
const {ComplianceRequest } = require('/Medyaanbeg/Audit_Manager/ComplianceAuditRequest');
const { readExcel } = require('/Medyaanbeg/Utils/excelUtil');



test.describe.serial('TS01 - AuditManager ', () => {
  const data = readExcel("C:/Medyaanbeg/TestData/Common_Operation.xlsx", "Login");

  //  test.setTimeout(120000);
  test("TC001 - Login Page", async ({ page }) => {
    const { Url, UserName, Password } = data[0];

    const Launch = new Homepage(page);
    await Launch.Launchpage(Url);
    await Launch.Signin(UserName, Password);
  });
  });
  
  test.describe.serial('TS02 - Compliance_Audit_Manager', () => {
    test.setTimeout(120000);
    const data = readExcel("C:/Medyaanbeg/TestData/Audit_manager.xlsx", "ComplianceRequest");

    test('TC001 - Compliance_Audit_Manager', async ({ page }) => {
      const {SelectAuditRequest, Taskname, Search} = data[0];

      const Request = new ComplianceRequest(page);
      await Request.SelectAuditRequest(SelectAuditRequest);
      await Request.CompletedTab();
      await Request.PendingTab();
      await Request.Search(Search);
     await Request.Checkbox(Taskname);
     


    });
  
});

