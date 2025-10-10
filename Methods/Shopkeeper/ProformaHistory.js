exports.Prof_History = class Prof_History {

    constructor(page) {
        this.page = page;
        //
        this.proforma = page.locator("//a[normalize-space()='Proforma']")
        this.proforma_History = page.locator("//a[normalize-space()='Proforma History']")

        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")
        this.xicon = page.locator("//div[contains(@class,'b-sidebar-outer')]/div/following-sibling::div/header[@class='b-sidebar-header']//button[@aria-label='Close']//*[name()='svg']");

        //

        this.datepicker = page.locator("//div[@class='consumer-filter-date d-none d-md-block']//div[@class='vd-picker__input-icon']/following-sibling::input")
        this.dateclear = page.locator("//button[@aria-label='clearable icon']")

        //search and download
        this.search = page.locator("//input[@id='patientquickFilter' or @id='pharmacyhistoryFilter']")
        this.download = page.locator("//button[@data-test='download-button']")

        //for Page Load Locator
        this.loaded = page.locator("//div[@class='v-window__container']//div//div//div//div[@role='grid']")

        //Bill
        this.bill = page.locator("//button[@class='btn reference-btn btn-secondary']")

        //Back button
        this.backbut = page.locator(`//button[@class='btn secondary-btn back-btn-size btn-secondary' or @class='cancelbtn-color']`)
        const backcount = this.backbut.count();
        const backindex = backcount >= 2 ? 2 : 1
        this.back = page.locator(`(//button[@class='btn secondary-btn back-btn-size btn-secondary' or @class='cancelbtn-color'])[${backindex}]`)

        //Print button
        this.print = page.locator("//button[@class='submit_btn primary_btn submitbtn-color']")
    }




    async Click_Proforma() {
        await this.proforma.waitFor({ state: 'visible' });

        await this.proforma.click()
        await this.page.waitForTimeout(500);
    }
 async Click_ProformaHistory() {
        await this.proforma_History.waitFor({ state: 'visible' });

        await this.proforma_History.click()
        await this.page.waitForTimeout(500);
    }
    async History_Button() {

        await this.history.waitFor({ state: 'visible' });

        await this.history.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);

    }
    async XIcon() {


        await this.xicon.waitFor({ state: 'visible' });

        await this.xicon.click();
        await this.loaded.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(1000);
    }
    async Download() {
        await this.download.waitFor({ state: 'visible' });

        await this.proforma.click()
        await this.page.waitForTimeout(500);
    }
    async Clear_Date() {
        await this.dateclear.waitFor({ state: 'visible' });

        await this.dateclear.click()
        await this.page.waitForTimeout(500);
    }


  async DatePicker(date, month, year, isEndDate = false) {
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


    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        const load = "//div[@class='v-window__container']//div//div//div//div[@role='grid']"

        await this.page.locator(load).waitFor({ state: 'visible' });
        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }

    async View_Proforma(cus, pet) {


        const cus_name = cus.toLowerCase()
        const pet_name = pet.toLowerCase()

        //View With Customer ID or Name and Pet ID.
        //  const View = this.page.locator(`//div[@class='ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first']//div[@col-id='ownerid' or @col-id="patientname"][normalize-space()='Ej Pradeep']/following-sibling::div[@col-id='petid'][normalize-space()='27259']/following-sibling::div[@col-id='action']/div`)

        //View With Customer ID or Name and Pet ID or Name.
        const view1 = this.page.locator(`//div[   (@col-id='ownerid' or @col-id='patientname') and   contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}') ] /following-sibling::div[   (@col-id='petid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}'))   or    (@col-id='petname' and .//b[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]) ] /following-sibling::div[@col-id='action']/div`).first()

        //View With Customer ID or Name
        const view2 = this.page.locator(`//div[(@col-id='ownerid' or @col-id='patientname')    and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}') ]/following-sibling::div[@col-id='action']/div`).first()

        await this.loaded.waitFor({ state: 'visible' })

        if (cus_name !== '' && pet_name !== '') {

            await view1.waitFor({ state: 'visible' })

            await view1.click();

        } else if (cus_name == '' && pet_name !== '') {

            await view2.waitFor({ state: 'visible' })

            await view2.click();

        }
        //wait for loading
        const load = this.page.locator("//div[@id='medicine-table']//div[@name='center']//div[@role='row']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000)

    }
    async Bill_Button() {
        await this.bill.waitFor({ state: 'visible' });

        await this.bill.click()
        const load = this.page.locator("//div[@class='col-12 col']")
        await load.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(500);
    }
    async Back_Button() {
        await this.back.waitFor({ state: 'visible' });

        await this.back.click()
        await this.page.waitForTimeout(500);
    }
    async Print_Button() {
        await this.print.waitFor({ state: 'visible' });

        await this.print.click()
        await this.page.waitForTimeout(500);
        await page.pdf({
            path: 'invoice.pdf',
            format: 'A4',
            printBackground: true
        });

    }
}