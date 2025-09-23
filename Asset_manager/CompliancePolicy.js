const { readExcel } = require('../utils/excelUtil');
const policydata = readExcel("C:/Medyaanbeg/TestData/Assetmanager.xlsx", "CompliancePolicy");


exports.CompliancePolicy = class CompliancePolicy {

  constructor(page) {
    this.page = page;
    
    //Select Asset Module(AssetCategory)
    this.hoverAction = page.locator("//div[text()='Compliance']");
    this.tabAction = page.locator("//div[text()='Compliance']")

    // Click Action
    this.backArrow = page.locator("//div[@class='col']//*[@data-icon='arrow-left']");
    this.cancel = page.locator(`(//div[@class="text-center"]//*[@type="button"])[1]`)
    this.submit = page.locator(`(//div[@class="text-center"]//*[@type="button"])[2]`)
    this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
    this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
    this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

    //Create - AddCompliancePolicy


    //const { project, assetname, auditrequired } = policydata[0];
    const { taskname, assetname, auditrequired, project } = policydata[0];

    this.addCompliancePolicy = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
    this.taskName = page.locator("#taskTitle");
    this.project = "//label[text()='Project']/following-sibling::select[@class='custom-select']";
    // page.selectOption("//label[text()='Project']/following-sibling::select[@class='custom-select']", { lable: `${project}` });

    this.assetName = page.locator(".multiselect__tags");
    this.assetName2 = page.locator(`//ul[@class='multiselect__content']/li/span/span[contains(.,'${assetname}')]`)
    this.auditRequired = page.locator(`//label[text()='Audit Required ? ']/../div/div[@class='custom-control custom-control-inline custom-radio']/label/span[text()='${auditrequired}']`)
    this.pHours = page.locator("//div[@class='el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time-select']//input[@placeholder='HH:MM']")

    this.startTime = page.locator("//label[text()='Start Time']/../div/input")
    this.endTime = page.locator("//label[text()='End Time']/../div/input")
    this.startDate = this.page.locator("#startDate");
    this.endDate = page.locator("#endDate")
    this.description = page.locator("#descValue")

    //Edit Compliance Policy
    this.viewbutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn view-btn btn-secondary']`)
    this.Editbutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn edit-btn btn-secondary']`)
    this.deletebutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn delete-btn btn-secondary']`)





  }
  async Select_AssetModule() {
    await this.page.waitForTimeout(2000);
    //Tab Action
    await this.hoverAction.hover();
    await this.hoverAction.click();
    await this.page.waitForTimeout(2000);
    await this.tabAction.press('Tab')
    await this.tabAction.press('Enter');
    await this.page.waitForTimeout(2000);
    await this.addCompliancePolicy.hover();
    await this.page.waitForTimeout(2000);
  }
  async Click_AddCompliancePolicy() {
    await this.page.waitForTimeout(2000);
    await this.addCompliancePolicy.click();
    await this.backArrow.click();
    await this.addCompliancePolicy.click();
    await this.page.waitForTimeout(1000);
    await this.cancel.click();
    await this.page.waitForTimeout(1000);
    await this.cancelIcon.click();
    await this.page.waitForTimeout(1000);
    await this.cancel.click();
    await this.page.waitForTimeout(1000);
    await this.confirmNo.click();
    await this.page.waitForTimeout(1000);
    await this.cancel.click();
    await this.page.waitForTimeout(1000);
    await this.confirmYes.click();
    await this.page.waitForTimeout(1000)
    await this.addCompliancePolicy.click();
    await this.submit.click();
    await this.page.waitForTimeout(1000)
    await this.backArrow.click();
  }


  async CreateCompliancePolicy() {
    console.log(policydata);

    const { assetname, Plannedhours, description, taskname, project } = policydata[0];
    // Start automating steps
    await this.page.waitForTimeout(500);
    await this.addCompliancePolicy.click();
    await this.page.waitForTimeout(500);
    await this.taskName.fill(`${taskname}`);
    await this.page.waitForTimeout(1000);
    await this.page.selectOption(this.project, { label: project });

    // Handle project selection (not implemented, assuming you need to select a project)
    await this.page.waitForTimeout(1000);

    await this.assetName.click();
    await this.page.waitForTimeout(500);


    if (assetname == true) {
      await this.assetName2.click();
      await this.page.waitForTimeout(500);
    } else {
      await this.assetName2.first().click();
    }

    await this.page.waitForTimeout(1000);

    await this.auditRequired.click();
    await this.page.waitForTimeout(500);

    // Handle planned hours
    await this.pHours.click();
    await this.page.locator(`//div[@class='el-scrollbar__view']/div[text()="${Plannedhours}"]`).click();
    // Handle start time selection

    await this.Starttime_handle();
    await this.handleRecurrence();

    await this.page.waitForTimeout(500);
    await this.description.fill(`${description}`);
    await this.page.waitForTimeout(1000);
    await this.submit.click();
    await this.page.waitForTimeout(1000);
    await this.confirmNo.click();
    await this.page.waitForTimeout(500);
    await this.submit.click();
    await this.page.waitForTimeout(500);
    await this.confirmYes.click();
    await this.page.waitForTimeout(2000);
  }
  async Starttime_handle() {
    const { starttime1, starttime2 } = policydata[0];

    // Click start time field
    await this.startTime.click();
    await this.page.waitForTimeout(2000);

    // Select specific hour from config
    const hours = this.page.locator("//body/div[5]/div[1]/div[1]/div[1]/div[1]/ul[1]/li");

    const hoursCount = await hours.count();
    console.log("Hours locator:", hoursCount);

    // Find and select configured hour
    for (let i = 0; i < hoursCount; i++) {
      const hourText = await hours.nth(i).textContent();
      if (hourText.trim() === String(starttime1)) {
        await hours.nth(i).click();
        break;
      }
    }

    await this.page.waitForTimeout(1000);

    // Select specific minutes from config
    const minutes = this.page.locator("//body/div[5]/div[1]/div/div[2]/div[1]/ul/li");
    await minutes.first().waitFor();
    await this.page.waitForTimeout(1000);
    const minutesCount = await minutes.count();
    console.log("Minutes count:", minutesCount);


    // Find and select configured minutes
    for (let i = 0; i < minutesCount; i++) {
      const minuteText = await minutes.nth(i).textContent();
      if (minuteText.trim() === String(starttime2)) {
        console.log("Clicking on minute:", minuteText);

        await minutes.nth(i).click();

        break;
      }
    }

    // Click OK
    await this.page.locator("//div[@x-placement='bottom-start']//button[@type='button'][normalize-space()='OK']").click();
    await this.page.waitForTimeout(500);
  }




  async handleDateTimeSelection(dateField, date, month, year, isEndDate = false) {
    await dateField.click();
    await this.page.waitForTimeout(500);

    // Updated calendar index handling
    const calendarIndex = isEndDate ? 2 : 1;

    // More specific locators for each calendar instance
    const yearLabel = this.page.locator(`(//div[@class='el-date-picker__header']/span)[${calendarIndex * 2 - 1}]`);
    const monthLabel = this.page.locator(`(//div[@class='el-date-picker__header']/span)[${calendarIndex * 2}]`);

    // Get and handle year selection
    const currentYear = parseInt(await yearLabel.textContent());
    const targetYear = parseInt(year);

    if (currentYear !== targetYear) {
      const yearDiff = targetYear - currentYear;
      const nextYearBtn = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[${calendarIndex}]`);

      for (let i = 0; i < Math.abs(yearDiff); i++) {
        await nextYearBtn.click();
        await this.page.waitForTimeout(500);
      }
    }

    // Updated month selection with index-based locators
    await this.page.waitForTimeout(500)
    await monthLabel.click();
    await this.page.waitForTimeout(1000);

    // Updated month selector with better visibility check
    const monthLocator = `(//div[@class='el-picker-panel__content'])[${calendarIndex}]//a[contains(text(),'${month}')]`;
    await this.page.waitForSelector(monthLocator);
    await this.page.locator(monthLocator).click();
    await this.page.waitForTimeout(1000);

    // Updated date selection with better locator
    // try {
    // First try exact date
    const exactDateLocator = `(//div[@class='el-picker-panel__content'])[${calendarIndex}]//td[contains(@class,'available')]//span[text()='${date}']`;
    const dateElement = this.page.locator(exactDateLocator);

    // Wait for either exact date or available dates to be visible
    await Promise.race([
      dateElement.waitFor({ state: 'visible', timeout: 5000 }),
      this.page.waitForSelector(`(//div[@class='el-picker-panel__content'])[${calendarIndex}]//td[contains(@class,'available')]`,
        { state: 'visible', timeout: 5000 })
    ]);

    // If exact date is found, click it
    if (await dateElement.count() > 0) {
      console.log("dateElement:", dateElement);

      await dateElement.click();
    } else {
      // Otherwise, find the date among available dates
      const availableDates = this.page.locator(`(//div[@class='el-picker-panel__content'])[${calendarIndex}]//td[contains(@class,'available')]`);
      const count = await availableDates.count();
      console.log("Available dates count:", count);


      for (let i = 0; i < count; i++) {
        console.log("284 Iterating available date index:", i);

        const dateText = await availableDates.nth(i).textContent();
        // console.log(`Checking date: ${dateText}`);
        if (dateText.trim() === date) {
          await availableDates.nth(i).click();
          console.log(`Clicked on date: ${date}`);

          break;

        }
      }
    }


    await this.page.waitForTimeout(1000);

    // Verify selection
    const selectedValue = await dateField.inputValue();
    console.log(`Selected date: ${selectedValue}`);
  }

  async handleRecurrence() {

    // const Policy = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
    const { recurrence, startDate, startMonth, startYear, endDate, endMonth, endYear } = policydata[0];

    await this.page.selectOption("//div[@id='recurrenceScroll']/label/following-sibling::select[@class='custom-select']", { value: `${recurrence}` });
    await this.page.waitForTimeout(2000);

    if (recurrence === "weekday" || recurrence === "weekend") {

      const storeyear = this.page.locator("(//div[@class='el-date-picker__header']/span)[1]");
      const storemonth = this.page.locator("(//div[@class='el-date-picker__header']/span)[2]");
      await this.startDate.click();
      await this.page.waitForTimeout(1000);
      //   const getYear = await storeyear.nth(0).textContent();

      //console.log(getYear);
      //console.log(year);

      const getYearText = await storeyear.nth(0).textContent();
      const currentYear = parseInt(getYearText.trim());
      const targetYear = parseInt(startYear);


      //disabled
      const isEnabled = await this.page.locator("//tr[@class='el-date-table__row']/td")
      const count = await isEnabled.count();
      //console.log(count);

      for (let j = 0; j < count; j++) {
        const element = isEnabled.nth(j);  // get the element locator
        console.log("Element:", element);

        const className = await element.getAttribute('class'); // get the class attribute
        //  try {
        // Handle start date 
        //if (currentYear === targetYear || className == "normal disabled") 
        if (className == "normal disabled") {
          await this.page.waitForTimeout(1000);
          await this.page.locator("(//tr[@class='el-date-table__row']/td[@class='available today'])[1]").click();
          await this.page.waitForTimeout(2000);


        } else {

          await this.handleDateTimeSelection(this.startDate, startDate, startMonth, startYear, false);
        }
        await this.handleDateTimeSelection(this.endDate, endDate, endMonth, endYear, true);
        break;

      }
    }


  }
  async View_CompliancePolicy() {




    //Click the View button for the specific-policy
    await this.viewbutton.click();
    await this.page.waitForTimeout(500);
    await this.description.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000);
    await this.backArrow.click();
    await this.page.waitForTimeout(2000);
  }
  async Edit_CompliancePolicy() {

    //Click the edit button for the specific-policy

    await this.Editbutton.click();
    await this.page.waitForTimeout(500);
    await this.backArrow.click();
    await this.page.waitForTimeout(500);
    await this.Editbutton.click();
    await this.page.waitForTimeout(500);
    await this.description.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.cancel.click();
    await this.confirmNo.click();
    await this.page.waitForTimeout(500);
    await this.cancel.click();
    await this.confirmYes.click();
    await this.page.waitForTimeout(500);
    await this.Editbutton.click();
    await this.page.waitForTimeout(500);
    await this.description.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.description.fill("This is for Edit Automation testing purpose");
    await this.page.waitForTimeout(500);
    await this.submit.click();
    await this.page.waitForTimeout(500);
    await this.confirmNo.click();
    await this.page.waitForTimeout(500);
    await this.submit.click();
    await this.page.waitForTimeout(500);
    await this.confirmYes.click();
    await this.page.waitForTimeout(2000);
  }
  async delete_CompliancePolicy() {

    //Click the Delete button for the specifi-policy
    await this.deletebutton.click();
    await this.page.waitForTimeout(500);
    await this.cancelIcon.click();
    await this.page.waitForTimeout(500);
    await this.deletebutton.click();
    await this.page.waitForTimeout(500);
    await this.confirmNo.click();
    await this.page.waitForTimeout(1000);
    //await Delete.click();
    //await this.confirmYes.click();

  }


}
