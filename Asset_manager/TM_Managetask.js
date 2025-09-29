const { readExcel } = require('../utils/excelUtil');
const data = readExcel("C:/Medyaanbeg/TestData/Assetmanager.xlsx", "ManageTask(TM)");

exports.Taskmanage = class Taskmanage {

  constructor(page) {
    this.page = page;

    //Select Asset Module(AssetCategory)
    this.Action = page.locator("//div[text()='Task Management']");
    this.SearchIcon = page.locator("//div[@class='col input-role-search']//*[name()='svg']");

    //Click Action
    this.backArrow = page.locator("//div[@class='d-flex align-items-center ml-3']//*[@data-icon='arrow-left']");

    //Filter Option
    this.filterbox = page.locator("//button[@id='taskTypeDropdown__BV_toggle_']");
    this.filteroption = page.locator("//div[@id='adminscreen-dashboard']//li/a[normalize-space(text())='My Tasks']");
    this.filtercancel = page.locator("//button[@class='v-icon notranslate search-grid-close v-icon--link mdi mdi-close-circle-outline theme--light']");

    //search
    this.searchbox = page.locator("//input[@placeholder='Search']");
    const count = this.searchbox.count();
    console.log(count);

    const Searchindex = count >= 2 ? 2 : 1;
    this.searchdata = page.locator(`(//input[@placeholder='Search'])[${Searchindex}]`);
    //without filter search clear button
    this.searchclear1 = page.locator(`(//input[@placeholder='Search'])[${Searchindex}]//following-sibling::button`);
    //with filter search clear button
    this.searchclear2 = page.locator(`//img[@title='Clear']`);

    // Create Task Locators

    this.addTask = page.locator("//div[@class='row project-role-header m-0']//div[@class='col']//button[@type='button']");
    this.taskTitle = page.locator("//textarea[@id='name']");
    this.project = page.locator("//label[text()='Project']/following-sibling::select");
   
    //Assigned-to field
    this.assignedtoloc = page.locator(`//label[text()='Assigned To']`)
    const assignedCount = this.assignedtoloc.count();
    const assignindex = assignedCount >= 2 ? 2 : 1;
    this.assignedto = page.locator(`(//label[text()='Assigned To'])[${assignindex}]/following-sibling::select`);

    this.deadline = page.locator("//input[@placeholder='DD/MM/YYYY']");
    this.startTime = page.locator("//label[text()='Start Time']/../div/input");
    this.endTime = page.locator("//label[text()='End Time']/../div/input");
    this.priority = page.locator("//select[@class='custom-select priorityDropdown']");
    this.description = page.locator("//textarea[@id='descValue']");
    this.submit = page.locator("//div[@class='text-center mobile-button-position']//button[2]");

    //Confim message 

    this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
    this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
    this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

    //Select Project & Task

    const { Project, TaskTitle, TaskTab } = data[0];
    this.selectProject = page.locator(`//b[contains(normalize-space(), '${Project}')]`);
    this.selectTask = page.locator(`//h6[normalize-space()='Open' or normalize-space()='ToDo' or normalize-space()='Inprogress' or normalize-space()='Completed']/../following-sibling::div/div/div/following-sibling::div/div/div/p/strong[text()= '${TaskTitle}']`);
    this.note = page.locator("//textarea[@id='textarea']");
    this.images = page.locator('#multipleFileDropbox');
    this.addnote = page.locator("//div[@class='text-end mr-5 mt-2']//button[@type='button']");
    this.edittask = page.locator("//button[@class='btn primary-btn save-btn-size mr-2 btn-primary']");
    this.savebutton = page.locator(`//button[@class='btn primary-btn save-btn-size btn-primary' or @class="btn primary-btn save-btn-size mr-2 btn-primary"]`)
    this.canceledit = page.locator("//div[@class='task-edit-btn']//button[@class='btn secondary-btn cancel-btn-size btn-primary']")
    this.startwork = page.locator("//button[@class='btn start-work-btn cancel-btn-size mr-3 btn-success' or @class='btn start-work-btn cancel-btn-size mr-3 btn-danger']");
    this.delete = page.locator("//div[@class='py-0 col']//button[2]/*[@data-icon='trash']]");

    //Task Tab Handle
    this.selectTaskTab = page.locator(`//div[@class='v-slide-group__content v-tabs-bar__content']/div/following-sibling::div[contains(text(),'${TaskTab}')]`);

    //Add Consumption
    this.createcons = page.locator("//button[@class='btn btn-secondary primary-btn save-btn-size mr-2']");
    this.cancelcons = page.locator("//button[@class='btn btn-secondary secondary-btn cancel-btn-size mr-2']");
    this.searchcons = page.locator("//div[@id='displayName']//input[@id='searchInput']");
    this.batch = page.locator("//select[@id='batchNo']");
    this.quantity = page.locator("//input[@id='quantityNo']");
    this.addcons = page.locator("//button[normalize-space()='Add']");


    //Task Stage Move or Navigation
    this.nextstage = page.locator("//span[contains(text(),'Next Stage')]");
    this.prevstage = page.locator("//span[contains(text(),'Previous Stage')]");







  }

  async Select_AssetModule() {
    await this.page.waitForTimeout(1000);
    //Tab Action
    await this.Action.hover();
    await this.Action.click();
    await this.page.waitForTimeout(500);
    //performed Tab button action
    await this.Action.press('Tab')
    //performed Enter button action
    await this.Action.press('Enter');
    await this.page.waitForTimeout(500);
    await this.SearchIcon.hover();
    await this.page.waitForTimeout(1000);
  }

  async Filter_Task() {
    await this.filterbox.click();
    await this.page.waitForTimeout(500);
    await this.filteroption.click();
    await this.page.waitForTimeout(1000);
  }
  async Filter_Cancel() {
    await this.filtercancel.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.filtercancel.click();
    await this.page.waitForTimeout(1000);
  }
  async Search() {
    const { Search } = data[0];
    await this.searchdata.fill(Search);
    await this.page.waitForTimeout(500);

  }
  async SearchClear() {
    // await this.searchclear1.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    const clear = await this.searchclear2.getAttribute('title')
    console.log(clear);


    if (clear == 'Clear') {
      await this.searchclear2.click();
    } else {
      await this.searchclear1.click();
    }
  }
  // ...existing code...

  async createTask() {
    try {
      await this.clickAddTask();
      await this.TaskTitle();
      await this.Project();
      await this.Priority();
      await this.Deadline();
      await this.StartTime();
      await this.EndTime();
      //await this.Assigned_To();
      await this.Description();
      await this.SubmitTask();
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  }

  async clickAddTask() {
    await this.addTask.click();
    await this.page.waitForTimeout(500);
  }

  async TaskTitle() {
    const { TaskTitle } = data[0];
    await this.taskTitle.fill(TaskTitle);
    await this.page.waitForTimeout(500);
  }

  async Project() {
    const { Project } = data[0];
    await this.project.selectOption({ label: Project });
    await this.page.waitForTimeout(500);
  }

  async Priority() {
    const { Priority } = data[0];
    await this.page.waitForTimeout(500);
    if (Priority == '1') {
      await this.page.locator("//span[@class='b-rating-star flex-grow-1 focused b-rating-star-empty']").click();
      await this.page.waitForTimeout(500);
    } else if (Priority == '2') {
      await this.page.locator("//span[@class='b-rating-star flex-grow-1 b-rating-star-empty'].nth(0)").click();
      await this.page.waitForTimeout(500);
    } else if (Priority == '3') {
      await this.page.locator("//span[@class='b-rating-star flex-grow-1 b-rating-star-empty'].nth(1)").click();
      await this.page.waitForTimeout(500);
    }
  }

  async Assigned_To() {
    const { Assignedto } = data[0];
    await this.page.waitForTimeout(500);
    await this.assignedto.scrollIntoViewIfNeeded();
    /*const optionToSelect = Assignedto
      ? ({ label: Assignedto })
      : ({ value: Assignedto });

    await this.assignedto.selectOption(optionToSelect);*/

    await this.assignedto.selectOption({ value: Assignedto });
    await this.page.waitForTimeout(500);
  }


  async Deadline(isEndDate = false) {
    const { date, month, year } = data[0];
    await this.deadline.click();
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
    const monthLocator = `//div[@class='el-picker-panel__content']//a[contains(text(),'${month}')]`;
    await this.page.waitForSelector(monthLocator);
    await this.page.locator(monthLocator).click();
    await this.page.waitForTimeout(1000);

    // Updated date selection with better locator
    // try {
    // First try exact date
    const exactDateLocator = `//div[@class='el-picker-panel__content']//td[contains(@class,'available')]//span[text()='${date}']`;
    const dateElement = this.page.locator(exactDateLocator);

    // Wait for either exact date or available dates to be visible
    await Promise.race([
      dateElement.waitFor({ state: 'visible', timeout: 5000 }),
      this.page.waitForSelector(`//div[@class='el-picker-panel__content']//td[contains(@class,'available')]`,
        { state: 'visible', timeout: 5000 })
    ]);

    // If exact date is found, click it
    if (await dateElement.count() > 0) {
      console.log("dateElement:", dateElement);

      await dateElement.click();
    } else {
      // Otherwise, find the date among available dates
      const availableDates = this.page.locator(`//div[@class='el-picker-panel__content']//td[contains(@class,'available')]`);
      const count = await availableDates.count();
      console.log("Available dates count:", count);


      for (let i = 0; i < count; i++) {
        //  console.log("284 Iterating available date index:", i);

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
    const selectedValue = await this.deadline.inputValue();
    console.log(`Selected date: ${selectedValue}`);
  }





  async StartTime() {
    const { StartHours, StartMin } = data[0];

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
      if (hourText.trim() == StartHours) {
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
      if (minuteText.trim() == StartMin) {
        console.log("Clicking on minute:", minuteText);

        await minutes.nth(i).click();

        break;
      }
    }

    // Click OK
    await this.page.locator("//div[@x-placement='bottom-start']//button[@type='button'][normalize-space()='OK']").click();
    await this.page.waitForTimeout(500);
  }




  async EndTime() {
    const { Endhours, EndMin } = data[0];

    // Click start time field
    await this.page.waitForTimeout(500);
    await this.endTime.click();
    await this.page.waitForTimeout(1000);

    // Select specific hour from config
    const hours = this.page.locator("//body/div[@x-placement='bottom-start']/div/div/div[1]/div[1]/ul[1]/li");

    const hoursCount = await hours.count();
    console.log("Hours locator:", hoursCount);

    // Find and select configured hour
    for (let i = 0; i < hoursCount; i++) {
      const hourText = await hours.nth(i).textContent();
      if (hourText.trim() == Endhours) {
        await hours.nth(i).click();
        break;
      }
    }

    await this.page.waitForTimeout(1000);

    // Select specific minutes from config
    const minutes = this.page.locator("//body/div[6]/div[1]/div[1]/div[2]/div[1]/ul[1]/li");
    await minutes.first().waitFor();
    await this.page.waitForTimeout(1000);
    const minutesCount = await minutes.count();
    console.log("Minutes count:", minutesCount);


    // Find and select configured minutes
    for (let i = 0; i < minutesCount; i++) {
      const minuteText = await minutes.nth(i).textContent();
      if (minuteText.trim() == EndMin) {
        console.log("Clicking on minute:", minuteText);

        await minutes.nth(i).click();

        break;
      }
    }

    // Click OK
    await this.page.locator("//div[@x-placement='bottom-start']//button[@type='button'][normalize-space()='OK']").click();
    await this.page.waitForTimeout(500);

  }
  async Description() {
    const { Description } = data[0];
    await this.description.scrollIntoViewIfNeeded();

    await this.description.fill(Description);
    await this.page.waitForTimeout(500);

  }
  async SubmitTask() {
    await this.submit.click();

    await this.page.waitForTimeout(1000);

  }
  async ConfirmYes() {
    await this.confirmYes.click();
    await this.page.waitForTimeout(2000);
  }
  async ConfirmNo() {
    await this.confirmNo.click();
    await this.page.waitForTimeout(1000);
  }
  async CancelIcon() {
    await this.cancelIcon.click();
    await this.page.waitForTimeout(1000);
  }


  async ClickProject() {
    await this.selectProject.click();
    await this.page.waitForTimeout(2000);
  }
  async ClickTask() {
    await this.selectTask.waitFor({ state: 'visible' });
    await this.selectTask.scrollIntoViewIfNeeded();
    await this.selectTask.click();
    await this.page.waitForTimeout(2000);
  }
  async EditTask() {
    await this.edittask.click();
    await this.page.waitForTimeout(1000);

  }
  async SaveButton() {
    await this.savebutton.click();
    await this.page.waitForTimeout(1000);
  }
  async CancelEditTask() {
    await this.canceledit.click();
    await this.page.waitForTimeout(1000);
  }
  async Note() {
    const { Note } = data[0];
    await this.note.scrollIntoViewIfNeeded();
    await this.note.fill(Note);
    await this.page.waitForTimeout(500);
  }

  async ImageUpload() {

    const { ImagePath } = data[0];
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.images.scrollIntoViewIfNeeded(),

      this.images.click() // This opens the file picker
    ]);

    await fileChooser.setFiles(ImagePath);
    await this.page.waitForTimeout(2000);

  }
  async AddNote() {
    await this.addnote.click();
    await this.addnote.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
  }
  async NextStage() {
    await this.nextstage.waitFor({ state: 'visible' });
    await this.nextstage.click();
    await this.page.waitForTimeout(1000);
  }
  async PrevStage() {
    await this.prevstage.waitFor({ state: 'visible' });
    await this.prevstage.click();
    await this.page.waitForTimeout(1000);
  }
  async SelectTaskTab() {
    await this.selectTaskTab.waitFor({ state: 'visible' });
    await this.selectTaskTab.click();
    await this.page.waitForTimeout(1000);
  }
  //Click Add button in Consumption
  async CreateCons() {
    const { TaskTitle } = data[0];
    // Get all stages text

    const allStagesLocator = this.page.locator('//h6[@class="step-name"]');
    const stagesCount = await allStagesLocator.count();
    const allStagesText = [];

    for (let i = 0; i < stagesCount; i++) {
      const text = (await allStagesLocator.nth(i).textContent())?.trim();
      if (text) {
        allStagesText.push(text);
      }
    }

    console.log('All stages:', allStagesText);

    // Get current stage (assuming it has a special class 'active' or similar)
    const currentStageLocator = this.page.locator(`//strong[normalize-space()='${TaskTitle}']/../../../../../../preceding-sibling::div/h6[@class='step-name']`);
    const currentStageText = (await currentStageLocator.textContent())?.trim();

    console.log('Current stage:', currentStageText);

    // Now compare current stage text
    if (currentStageText == 'Open') {

      await this.NextStage();
      await this.page.waitForTimeout(500);
      await this.ConfirmYes();
      await this.page.waitForTimeout(500);
      await this.ClickTask();
      await this.page.waitForTimeout(500);
      await this.SelectTaskTab();
      await this.page.waitForTimeout(500);
      await this.createcons.click();

    } else if (currentStageText == 'Completed') {
      await this.PrevStage();
      await this.page.waitForTimeout(500);
      await this.ConfirmYes();
      await this.page.waitForTimeout(500);
      await this.ClickTask();
      await this.page.waitForTimeout(500);
      await this.SelectTaskTab();
      await this.page.waitForTimeout(500);
      await this.createcons.click();
    }

    else {
      console.log('Current stage is neither Open nor Completed. Creating consumption...');
      await this.createcons.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async CancelCons() {
    await this.cancelcons.click();
    await this.page.waitForTimeout(1000);
  }
  async SearchCons() {
    const { SearchConsumption } = data[0];
    await this.searchcons.fill(SearchConsumption);
    const locator = this.page.locator(`//b[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${SearchConsumption}')]`);
    await locator.waitFor({ state: 'visible' });

    await locator.click();

    await this.page.waitForTimeout(500);
  }

  async Batch() {
    const { Batch } = data[0];
    await this.batch.selectOption({ value: Batch });
    await this.page.waitForTimeout(500);
  }
  async Quantity() {
    const { Quantity } = data[0];
    await this.quantity.fill(Quantity);
    await this.page.waitForTimeout(500);
  }
  async AddCons() {
    await this.addcons.click();
    await this.page.waitForTimeout(1000);
  }


}