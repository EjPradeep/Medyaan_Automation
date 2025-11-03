exports.AM_AssetDisposal = class AM_AssetDisposal {

    constructor(page) {

        this.page = page;
        //Select Asset Module(AssetDisposal)
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

        //CreateDisposal
        this.selectAsset = page.locator(".multiselect__tags");
        this.addDisposal = page.locator("//button[@class='btn primary-btn addproduct-btn-size mr-1 btn-secondary']");
        this.assetName = page.locator(".multiselect__tags");
        this.disposalMethod = page.locator("//*[@id='disposalMethod']");
        this.disposalReason = page.locator("#disposalReason");
        this.disposalValue = page.locator("#disposalValue");
        this.disposalDate = page.locator(".el-input__inner");
        this.reason = page.locator("#disposalComments");

    }
    async Select_AssetDisposal() {
        await this.Action.waitFor({ state: 'visible' })
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(1000);
        for (var i = 0; i <= 3; i++) {
            await this.Action.press('Tab');;
        }
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addDisposal.hover();
        await this.page.waitForTimeout(1000);


    }
    async AddDisposal() {

        await this.addDisposal.click();
        await this.page.waitForTimeout(500);

    }
    async CreateAssetDisposal(assetname, DMethod, DReason, DValue, date, month, year, reason) {
        await this.AddDisposal();
        await this.AssetName(assetname);
        await this.DisposalMethod(DMethod);
        await this.DisposalReason(DReason);
        await this.DisposalValue(DValue);
        await this.DisposalDate(date, month, year);
        await this.Reason(reason);

    }
    async AssetName(ass) {
        await this.selectAsset.click();
        const asname = ass.toLowerCase()
        const select = this.page.locator(`//span/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asname}')]`);
        await select.scrollIntoViewIfNeeded()
        await select.waitFor({ state: 'visible' })
        await select.click();
    }
    async DisposalMethod(Select) {

        await this.page.selectOption("#disposalMethod", { label: `${Select}` });
        await this.page.waitForTimeout(500);
    }
    async DisposalReason(Select) {

        await this.page.selectOption("#disposalReason", { label: `${Select}` });
        await this.page.waitForTimeout(500);
    }
    async DisposalValue(amount) {
        await this.disposalValue.waitFor({ state: 'visible' })
        await this.disposalValue.fill(amount);
        await this.page.waitForTimeout(500);
    }
    async DisposalDate(date, month, year, isEndDate = false) {
        const clear = this.page.locator("//i[@class='el-input__icon el-icon-circle-close']")
        const isVisible = await clear.isVisible();
        if (isVisible) {
            await clear.click()
        }


        await this.disposalDate.click();
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
            const PrvYearBtn = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left'])[${calendarIndex}]`);

            for (let i = 0; i < Math.abs(yearDiff); i++) {
                await PrvYearBtn.click();
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

                const dateText = await availableDates.nth(i).textContent();
                if (dateText.trim() == date) {
                    await availableDates.nth(i).click();
                    console.log(`Clicked on date: ${date}`);

                    break;

                }
            }
        }


        await this.page.waitForTimeout(1000);

        // Verify selection
        const selectedValue = await this.disposalDate.inputValue();
        console.log(`Selected date: ${selectedValue}`);
    }

    async Reason(reason) {
        await this.reason.waitFor({ state: 'visible' })
        await this.reason.fill(reason);
        await this.page.waitForTimeout(500);

    }

    async Cancel() {
        await this.cancel.waitFor({ state: 'visible' })
        await this.cancel.click();
        await this.page.waitForTimeout(500);

    }

    async Submit() {
        await this.submit.waitFor({ state: 'visible' })
        await this.submit.click();
        await this.page.waitForTimeout(500);

    }
    async ConfirmYes() {
        await this.confirmYes.waitFor({ state: 'visible' })

        await this.confirmYes.click();
        await this.page.waitForTimeout(2000);
    }
    async ConfirmNo() {
        await this.confirmNo.waitFor({ state: 'visible' })
        await this.confirmNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CancelIcon() {
        await this.cancelIcon.waitFor({ state: 'visible' })
        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
    }

    async View_Disposal(id, name, code) {
        const assid = id.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const locatorOptions = [
            {
                //View With AssetCode.
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID.
                view: this.page.locator(`//div[@col-id='assetid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assid}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID, AssetName and AssetCode..
                view: this.page.locator(`//div[@col-id='assetid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assid}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            }
        ];

        for (const { view } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const viewCount = await view.count();
            if (viewCount !== 1) continue;

            const isVisible = await view.isVisible();
            if (isVisible) {
                await view.waitFor({ state: 'visible' });
                await view.click();
                await this.page.waitForTimeout(2000)
                return;
            }

        }
    }
    async Edit_Disposal(id, name, code) {
        const assid = id.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const locatorOptions = [
            {
                //Edit With AssetCode.
                Edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetName and AssetCode.
                Edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetID.
                Edit: this.page.locator(`//div[@col-id='assetid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assid}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetName.
                Edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetID, AssetName and AssetCode..
                Edit: this.page.locator(`//div[@col-id='assetid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assid}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            }
        ];

        for (const { Edit } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const EditCount = await Edit.count();
            if (EditCount !== 1) continue;

            const isVisible = await Edit.isVisible();
            if (isVisible) {
                await Edit.waitFor({ state: 'visible' });
                await Edit.click();
                await this.page.waitForTimeout(2000)
                return;
            }

        }
    }
    async Search() {
        await this.search.waitFor({ state: 'visible' });

        await this.search.click()
        await this.page.waitForTimeout(500);
    }
    async Download() {
        await this.download.waitFor({ state: 'visible' });

        await this.download.click()
        await this.page.waitForTimeout(500);
    }
    async BackArrow() {

        this.backArrow = this.page.locator("//*[@data-icon='arrow-left']");


        if (await this.backArrow.nth(2).isVisible()) {
            await this.backArrow.nth(2).waitFor({ state: 'visible' });

            await this.backArrow.nth(2).click();

        }
        if (await this.backArrow.nth(1).isVisible()) {
            await this.backArrow.nth(1).waitFor({ state: 'visible' });

            await this.backArrow.nth(1).click();

        } else if (await this.backArrow.first().isVisible()) {
            await this.backArrow.first().waitFor({ state: 'visible' });

            await this.backArrow.first().click();
        }
        const load = this.page.locator("//div[@class='ag-center-cols-container']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);
    }
}