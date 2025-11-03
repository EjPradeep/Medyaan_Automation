

exports.AssetPolicy = class AssetPolicy {

    constructor(page, expect) {
        this.page = page;
        //Select Asset Module(AssetCategory)
        this.Action = page.locator("//div[text()='Asset Management']");

        //
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.submit = page.locator("//span[contains(text(),'Submit')]")

        //Confim message 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //Search and Download
        this.search = page.locator("//div[@class='search-grid px-0 col']/div/input[@id='sellerQuickFilter']")
        this.download = page.locator("//button[@data-test='download-button']")

        //
        this.errorMessage = page.locator("//div[@class='required']")


        //Create_Asset Policy
        const Policydata = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
        const { taskname, project, assetname, auditrequired } = Policydata[0];

        this.addAssetPolicy = page.locator("//button[@class='btn primary-btn add-btn-size btn-secondary']");
        this.taskName = page.locator("#taskTitle");
        this.Project()
        this.assetName = page.locator(".multiselect__tags");
        this.auditRequired = page.locator(`//label[text()='Audit Required?']/../div/div[@class='custom-control custom-control-inline custom-radio']/label/span[text()='${auditrequired}']`)
        this.pHours = page.locator("//div[@class='el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time-select']//input[@placeholder='HH:MM']")
        this.startTime = page.locator("//label[text()='Start Time']/../div/input")
        this.endTime = page.locator("//label[text()='End Time']/../div/input")
        this.startDate = this.page.locator("#startDate");
        this.endDate = page.locator("#endDate")
        this.description = page.locator("#descValue")

        //Edit Asset Policy
        this.viewbutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn view-btn btn-secondary']`)
        this.Editbutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn edit-btn btn-secondary']`)
        this.deletebutton = page.locator(`//div[@class="ag-center-cols-container"]/*/div[text()='${assetname}']/following-sibling::*[@col-id="name" and text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn delete-btn btn-secondary']`)


    }

    async Select_AssetPolicy() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(2000);
        await this.Action.press('Tab')
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAssetPolicy.hover();
        await this.page.waitForTimeout(2000);
    }


    async AddAssetPolicy_Button() {

        await this.addAssetPolicy.click();

    }
    async TaskName(data) {
        await this.taskName.waitFor({ state: 'visible' })
        await this.taskName.fill(data);
        await this.page.waitForTimeout(500);
    }
    async Project(Select) {

        await this.page.selectOption("#disposalReason", { label: `${Select}` });
        await this.page.waitForTimeout(500);
    }
    async AssetName(ass) {
        await this.assetName.click();
        const asname = ass.toLowerCase()
        const select = this.page.locator(`//span/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asname}')]`);
        await select.scrollIntoViewIfNeeded()
        await select.waitFor({ state: 'visible' })
        await select.click();
    }
    async AuditRequired(audit) {
        await this.page.waitForTimeout(500)
        const Are = audit.toLowerCase()

        const select = this.page.locator(`//input[@type='radio']/../label/span[translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')= '${Are}']`)
        await select.waitFor({ state: 'visible' })
        await select.click({ force: true });
    }
    async Plannedhours(Plannedhours) {
        await this.pHours.click();
        await pHours.waitFor({ state: 'visible' })
        await this.page.locator(`//div[@class='el-scrollbar__view']/div[text()="${Plannedhours}"]`).click();
    }

    async StartTime(StartHours, StartMin) {

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
    async EndTime(Endhours, EndMin) {

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

    async Recurrence(recurrence, startDate, startMonth, startYear, endDate, endMonth, endYear) {


        await this.page.selectOption("//div[@id='recurrenceScroll']/label/following-sibling::select[@class='custom-select']", { value: `${recurrence}` });
        await this.page.waitForTimeout(2000);

        if (recurrence === "weekday" || recurrence === "weekend") {

            const storeyear = this.page.locator("(//div[@class='el-date-picker__header']/span)[1]");
            const storemonth = this.page.locator("(//div[@class='el-date-picker__header']/span)[2]");
            await this.startDate.click();
            await this.page.waitForTimeout(1000);

            const getYear = await storeyear.nth(0).textContent();
            const getYearText = await storeyear.nth(0).textContent();
            const currentYear = parseInt(getYearText.trim());
            const targetYear = parseInt(startYear);


            //disabled
            const isEnabled = await this.page.locator("//tr[@class='el-date-table__row']/td")
            const count = await isEnabled.count();
            //console.log(count);

            for (let j = 0; j < count; j++) {
                const element = isEnabled.nth(j);  // get the element locator

                const className = await element.getAttribute('class'); // get the class attribute
               
                if (currentYear === targetYear || className == "normal disabled") {
                    await this.page.waitForTimeout(1000);
                    await this.page.locator("(//tr[@class='el-date-table__row']/td[@class='available today'])[1]").click();
                    await this.page.waitForTimeout(2000);


                } else {

                    await this.handleDateTimeSelection(this.startDate, startDate, startMonth, startYear, false);
                    await this.page.waitForTimeout(2000);

                }

                await this.handleDateTimeSelection(this.endDate, endDate, endMonth, endYear, true);
                break;
            }
        }

    }
    async Date(dateField, date, month, year, isEndDate = false) {
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

    async Description(Description) {
        await this.description.scrollIntoViewIfNeeded();

        await this.description.fill(Description);
        await this.page.waitForTimeout(500);
    }

    async Click_AddAssetPolicy() {
        await this.page.waitForTimeout(2000);
        await this.addAssetPolicy.click();
        await this.backArrow.click();
        await this.addAssetPolicy.click();
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
        await this.addAssetPolicy.click();
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.backArrow.click();
    }
    async CreateAssetPolicy(TN, Pro, AN, AR, PH, SHrs, SMin, EHrs, EMin, rec, Sdate, Smon, Syear,Edate, Emon, Eyear,Des) {
        await this.AddAssetPolicy_Button()
        await this.TaskName(TN)
        await this.Project(Pro)
        await this.AssetName(AN)
        await this.AuditRequired(AR)
        await this.Plannedhours(PH)
        await this.StartTime(SHrs, SMin)
        await this.EndTime(EHrs, EMin)
        await this.Recurrence(rec,Sdate, Smon, Syear,Edate, Emon, Eyear)
        await this.Description(Des)
        


    }
    async Starttime_handle(starttime1, starttime2) {
        const Policydata = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
        const { } = Policydata[0];

        // Click start time field
        await this.startTime.click();
        await this.page.waitForTimeout(2000);

        // Select specific hour from config
        const hours = this.page.locator("//body/div[5]/div[1]/div[1]/div[1]/div[1]/ul[1]/li");
        //const hours2=await hours.textContent();

        const hoursCount = await hours.count();
        console.log("Hours locator:", hoursCount);

        // Find and select configured hour
        for (let i = 0; i < hoursCount; i++) {
            const hourText = await hours.nth(i).textContent();
            if (hourText.trim() === starttime1) {
                await hours.nth(i).click();
                break;
            }
        }

        await this.page.waitForTimeout(1000);

        // Select specific minutes from config
        const minutes = this.page.locator("//body/div[5]/div[1]/div/div[2]/div[1]/ul/li");
        await this.page.waitForTimeout(1000);
        const minutesCount = await minutes.count();
        console.log("Minutes count:", minutesCount);


        // Find and select configured minutes
        for (let i = 0; i < minutesCount; i++) {
            const minuteText = await minutes.nth(i).textContent();
            if (minuteText.trim() === starttime2) {
                console.log("Clicking on minute:", minuteText);

                await minutes.nth(i).click();

                break;
            }
        }

        // Click OK
        await this.page.locator("//div[@x-placement='bottom-start']//button[@type='button'][normalize-space()='OK']").click();
        await this.page.waitForTimeout(500);
    }

    /* await this.startDate.click();
     await this.page.locator("//div[@x-placement='bottom-start']/div/div/div[@class='el-picker-panel__content']/table/tbody/tr[@class='el-date-table__row']/td[@class='available today']").click()
     await this.endDate.click();
     await this.page.locator("//div[@x-placement='bottom-start']/div/div/div[@class='el-picker-panel__content']/table/tbody/tr[@class='el-date-table__row']/td[@class='available today']").click()
    */


    /*async handleRecurrence(date, month, year) {
        const storeyear = this.page.locator("(//div[@class='el-date-picker__header']/span)[1]");
        const storemonth = this.page.locator("(//div[@class='el-date-picker__header']/span)[2]");
        await this.addAssetPolicy.click();
        //await this.page.handleRecurrence("4", "Sep", "2025"); // fix param order too!
        const Policy = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
        const { project, assetname, auditrequired, recurrence } = Policy[0];
        await this.page.selectOption("//div[@id='recurrenceScroll']/label/following-sibling::select[@class='custom-select']", { value: `${recurrence}` });


        if (recurrence === "weekday" || recurrence === "weekend") {

            await this.startDate.click();
            await this.page.waitForTimeout(1000);
            //await this.page.locator("(//div[@class='el-date-picker__header']//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[1]").click();
            const getYear = await storeyear.nth(0).textContent();

            //console.log(getYear);
            //console.log(year);

            const getYearText = await storeyear.nth(0).textContent();
            const currentYear = parseInt(getYearText.trim());
            const targetYear = parseInt(year);


            //disabled
            // const isEnabled = await this.page.locator("//tr[@class='el-date-table__row']/td[@class='normal disabled']")
            const isEnabled = await this.page.locator("//tr[@class='el-date-table__row']/td")
            //console.log(isEnabled);


            // const count = await isEnabled.count();
            //console.log(count);


            const count = await isEnabled.count();
            console.log(count);

            for (let j = 0; j < count; j++) {
                const element = isEnabled.nth(j);  // get the element locator

                const className = await element.getAttribute('class'); // get the class attribute


                if (currentYear === targetYear || className == "normal disabled") {
                    await this.page.waitForTimeout(1000);
                    await this.page.locator("(//tr[@class='el-date-table__row']/td[@class='available today'])[1]").click();
                    await this.page.waitForTimeout(2000);
                    break;

                }
                //  console.log(`Element ${j} class: ${className}`);





                if (currentYear !== targetYear) {
                    const diff = targetYear - currentYear;

                    for (let i = 0; i < Math.abs(diff); i++) {

                        if (diff > 0) {
                            // Go forward in years

                            const nextyear = await this.page.locator("(//div[@class='el-date-picker__header']//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[1]")
                            
                            await nextyear.click();

                            await this.page.waitForTimeout(300);
                         // small wait for UI to update
                        }
                        


                    }

                }


                await this.page.waitForTimeout(2000);
                await storemonth.click();
                await this.page.waitForTimeout(2000);
                await this.page.locator(`//a[contains(text(),'${month}')]`).click();
                await this.page.waitForTimeout(2000);



                const getMonth = await storemonth.textContent();
                //console.log(getMonth);

                if (getMonth.includes(month)) {
                    await this.page.waitForTimeout(2000);

                    const locators = this.page.locator("//tr[@class='el-date-table__row']/td[@class='available']");
                    await this.page.waitForTimeout(2000);
                    const count = await locators.count();
                    //console.log(count);

                    for (let j = 0; j < count; j++) {
                        const locator = await locators.nth(j).textContent();
                        //console.log(locator);

                        if (locator.includes(date)) {
                            await locators.nth(j).click();
                            await this.page.waitForTimeout(1000);
                            break;
                        }

                    }

                }
            }


        }*/
    async handleDateTimeSelection(dateField, date, month, year, isEndDate = false) {
        await dateField.click();
        await this.page.waitForTimeout(2000);

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
                console.log(`287 Checking date: ${dateText}`);
                if (dateText.trim() === date) {
                    await availableDates.nth(i).click();
                    console.log(`290 Clicked on date: ${date}`);

                    break;

                }
            }
        }


        await this.page.waitForTimeout(1000);

        // Verify selection
        const selectedValue = await dateField.inputValue();
        /* const isEnabled = await this.page.locator("//tr[@class='el-date-table__row']/td")
  
  
          const count = await isEnabled.count();
          console.log(count);
  
          for (let j = 0; j < count; j++) {
              const element = isEnabled.nth(j);  // get the element locator
  
              const className = await element.getAttribute('class'); // get the class attribute
  
  
              if (!selectedValue && className == "normal disabled") {
                  await this.page.waitForTimeout(1000);
                  await this.page.locator("(//div[@x-placement='bottom-start']//div[@class='el-picker-panel__content']/table/tbody/tr/td[@class='available'])[1]").click();
                  await this.page.waitForTimeout(1000);
                  break
  
              }
              else {
                  // throw new Error(`Failed to select date ${date}/${month}/${year}`);
              }
          }*/

        /* } catch (error) {
             console.error(`Failed to select date: ${error.message}`);
             // Take screenshot for debugging
             await this.page.screenshot({
                 path: `date-selection-error-${isEndDate ? 'end' : 'start'}.png`,
                 fullPage: true
             });
             throw error;
         }*/
    }

    async Edit_AssetPolicy() {

        const Policy = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
        const { assetname, taskname } = Policy[0];

        //Click the View button for the specific-policy
        // await this.page.locator(`//div[@class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"]/div[text()='${assetname}']/following-sibling::div[text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/button[@class='btn view-btn btn-secondary']`).click();
        await this.viewbutton.click();
        await this.page.waitForTimeout(500);
        await this.description.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.backArrow.click();
        await this.page.waitForTimeout(2000);

        //Click the edit button for the specific-policy
        // await this.page.waitForSelector(`'${this.Editbutton}'`, {timeout: 5000,state: 'visible'   })   // other options: 'attached', 'hidden', 'detached'

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

        //Click the Delete button for the specifi-policy
        //const Delete = this.page.locator(`//div[@class="ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first"]/div[text()='${assetname}']/following-sibling::div[text()='${taskname}']/following-sibling::div[@col-id='action']/div/div/button[@class='btn delete-btn btn-secondary']`)
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








