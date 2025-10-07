exports.Proforma = class Proforma {

    constructor(page) {
        this.page = page;
        this.proforma = page.locator("//a[normalize-space()='Proforma']")

        //Proforma Details
        this.customer = page.locator("//*[@class='svg-inline--fa fa-user fa-w-14']/../../input[@placeholder='Search']")
        this.pet = page.locator("//*[@class='svg-inline--fa fa-paw fa-w-16']/../../input[@placeholder='Search']")
        this.searchmat = page.locator("//div[@class='mt-1 med-grid']//div//div//input[@id='searchInput']")
        this.quantity = page.locator("//input[@id='quantity']");
        this.duedate = page.locator("//input[@placeholder='Due Date']")
        this.add = page.locator("//div[@class='text-start']//button[@type='button']");
        this.createproforma = page.locator("//button[@class='btn primary-btn large-btn-size btn-secondary'][contains(text(),'Create')]")
        this.clear_searchmat = page.locator("//div[@class='mt-1 med-grid']//div//div//div[@id='common-search']//div[@class='search-input-grid']//div//div//img[@title='Clear']")

        //Invoice Headbuttons
        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")
        this.dashbord = page.locator("//div[contains(@class,'options-div')]//button[@class='btn close-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='home']")
        this.logout = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='sign-out-alt']")

        //Action
        this.edit_mat = page.locator("//div[@class='edit-group btn-group btn-group-sm']/button[@class='btn edit-btn btn-secondary']")
        this.delete_mat = page.locator("//div[@class='edit-group btn-group btn-group-sm']/button[@class='btn edit-btn btn-secondary']")

        //Confirm 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        // 
        this.cancel = page.locator("//div[contains(@class,'b-sidebar-outer')]/div/following-sibling::div/header[@class='b-sidebar-header']//button[@aria-label='Close']//*[name()='svg']");

    }

    async Click_Proforma() {
        await this.proforma.waitFor({ state: 'visible' });

        await this.proforma.click()
        await this.page.waitForTimeout(500);
    }

    async Search_Customer(sh_cus) {
        await this.customer.fill(sh_cus);
        const cus = sh_cus.toLowerCase();

        const locator = this.page.locator(`//b[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus}')]`);
        await locator.waitFor({ state: 'visible' });

        await locator.click();

        await this.page.waitForTimeout(500);
    }
    async Search_Pet(sh_pet) {
        await this.pet.fill(sh_pet);
        const pet = sh_pet.toLowerCase();

        const locator = this.page.locator(`//b[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet}')]`);
        await locator.waitFor({ state: 'visible' });

        await locator.click();

        await this.page.waitForTimeout(500);
    }

    async Search_Material(material) {

        await this.searchmat.fill(material);
        const mat = material.toLowerCase();
        const locator = this.page.locator(`//b[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${mat}')]`);
        await locator.waitFor({ state: 'visible' });

        await locator.click();

        await this.page.waitForTimeout(500);
    }
    async Clear_Search() {
        await this.clear_searchmat.waitFor({ state: 'visible' });

        await this.clear_searchmat.click();

        await this.page.waitForTimeout(500);
    }
    async Quantity(quantity) {
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(500);
    }

    async Add_button() {
        await this.add.click();
        await this.page.waitForTimeout(1000);
    }
    async Duedate(date, month, year, isEndDate = false) {
        await this.duedate.click();
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
        const selectedValue = await this.duedate.inputValue();
        console.log(`Selected date: ${selectedValue}`);
    }
    async Edit_Material() {

        await this.edit_mat.waitFor({ state: 'visible' });

        await this.edit_mat.click();
        await this.page.waitForTimeout(1000);
    }
    async Delete_Material() {
        await this.delete_mat.waitFor({ state: 'visible' });
        await this.delete_mat.click();
        await this.page.waitForTimeout(1000);
    }
    async CreateProforma_Yes() {

        await this.createproforma.click();
        await this.ConfirmYes()

        await this.page.waitForTimeout(500);
    }

    async CreateProforma_No() {

        await this.createproforma.click();
        await this.ConfirmNo()

        await this.page.waitForTimeout(500);
    }
    async ConfirmYes() {
        await this.confirmYes.waitFor({ state: 'visible' });

        await this.confirmYes.click();
        await this.page.waitForTimeout(1000);
    }
    async ConfirmNo() {
        await this.confirmNo.waitFor({ state: 'visible' });
        await this.confirmNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CancelIcon() {
        await this.cancelIcon.waitFor({ state: 'visible' });

        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
    }
    //Go to History page.
    async History_Button() {

        await this.history.waitFor({ state: 'visible' });

        await this.history.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);

    }
    //Get back to Home page.
    async Dashboard_Button() {

        await this.dashbord.waitFor({ state: 'visible' });

        await this.dashbord.click();
        await this.page.waitForTimeout(1000);
    }
    //Get Logout.
    async Logout_Button() {

        await this.logout.waitFor({ state: 'visible' });

        await this.logout.click();
        await this.page.waitForTimeout(1000);
    }
    async XIcon() {


        await this.cancel.waitFor({ state: 'visible' });

        await this.cancel.click();
        await this.page.waitForTimeout(1000);
    }
}