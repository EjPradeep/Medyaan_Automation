/*async handleDateTimeSelection(dateField, date, month, year, isEndDate = false) {
    await dateField.click();
    await this.page.waitForTimeout(1000);

    // Updated locators for both start and end date calendars
    const index = isEndDate ? 2 : 1;
    const yearSelector = this.page.locator(`(//div[@class='el-date-picker__header']/span)[${index * 2 - 1}]`);
    const monthSelector = this.page.locator(`(//div[@class='el-date-picker__header']/span)[${index * 2}]`);
    const nextYearButton = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[${index}]`);
    const prevYearButton = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left'])[${index}]`);

    // Get current year and calculate target
    const currentYearText = await yearSelector.textContent();
    const currentYear = parseInt(currentYearText.trim());
    const targetYear = parseInt(year);
    const yearDiff = targetYear - currentYear;

    // Navigate to correct year
    if (yearDiff !== 0) {
        const button = yearDiff > 0 ? nextYearButton : prevYearButton;
        for (let i = 0; i < Math.abs(yearDiff); i++) {
            await button.click();
            await this.page.waitForTimeout(300);
        }
    }

    // Select month with updated selector
    await monthSelector.click();
    await this.page.waitForTimeout(500);
    
    // Updated month selection locator
    const monthLocator = isEndDate ? 
        `(//div[contains(@class,'el-picker-panel')])[2]//a[contains(text(),'${month}')]` :
        `(//div[contains(@class,'el-picker-panel')])[1]//a[contains(text(),'${month}')]`;
    
    await this.page.locator(monthLocator).click();
    await this.page.waitForTimeout(500);

    // Updated date elements locator
    const dateElements = this.page.locator(
        isEndDate ? 
        "(//div[contains(@class,'el-picker-panel')])[2]//tr[@class='el-date-table__row']/td" :
        "(//div[contains(@class,'el-picker-panel')])[1]//tr[@class='el-date-table__row']/td"
    );
    
    const count = await dateElements.count();

    // Find and click the target date
    let dateFound = false;
    for (let i = 0; i < count; i++) {
        const element = dateElements.nth(i);
        const className = await element.getAttribute('class');
        const dateText = await element.textContent();
        
        if (!className.includes('disabled') && dateText.trim() === date) {
            await element.click();
            dateFound = true;
            break;
        }
    }

    if (!dateFound) {
        throw new Error(`Could not select date ${date}/${month}/${year} - date might be disabled or invalid`);
    }
}

async handleRecurrence(startDate, startMonth, startYear, endDate, endMonth, endYear) {
    await this.addAssetPolicy.click();
    await this.page.waitForTimeout(1000);

    const Policy = JSON.parse(JSON.stringify(require('../Utils/AssetPolicyUtils.json')));
    const { recurrence } = Policy[0];

    await this.page.selectOption(
        "//div[@id='recurrenceScroll']/label/following-sibling::select[@class='custom-select']",
        { value: `${recurrence}` }
    );

    if (recurrence === "weekday" || recurrence === "weekend") {
        try {
            // Handle start date
            await this.handleDateTimeSelection(this.startDate, startDate, startMonth, startYear, false);
            await this.page.waitForTimeout(1000);

            // Handle end date with isEndDate flag
            await this.handleDateTimeSelection(this.endDate, endDate, endMonth, endYear, true);
            await this.page.waitForTimeout(1000);

            // Validate selections
            const startDateValue = await this.startDate.inputValue();
            const endDateValue = await this.endDate.inputValue();

            if (!startDateValue || !endDateValue) {
                throw new Error('Date selection failed - please check the dates are valid');
            }

        } catch (error) {
            console.error(`Date selection failed: ${error.message}`);
            throw error;
        }
    }
}*/