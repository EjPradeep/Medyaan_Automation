const { console } = require('inspector');

exports.AM_Allocation = class AM_Allocation {

    constructor(page) {
        this.page = page;
        //Select Asset Module(AssetAllocation)
        this.Action = page.locator("//div[text()='Asset Management']");

        //Create - AddAssetAllocation
        this.addAssetAllocation = page.locator("//button[contains(text(),'Add Asset Allocation')]");
        this.selectAsset = page.locator(".multiselect__tags");
        this.user = page.locator("#searchInput")
        this.roomtype = page.locator("#locationType")
        this.startDate = page.locator('#startDate');
        this.endDate = page.locator('#endDate');

        //Tabs
        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");

        //
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.submit = page.locator("//span[contains(text(),'Submit')]")

        //Confim message 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //Search and Download
        this.search = page.locator("//div[@class='search-grid px-0 col']/div/input")
        this.download = page.locator("//button[@data-test='download-button']")
    }

    async Select_AssetAllocation() {
        await this.Action.waitFor({ state: 'visible' })
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(1000);
        for (var i = 0; i <= 1; i++) {
            await this.Action.press('Tab');;
        }
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAssetAllocation.hover();
        await this.page.waitForTimeout(1000);


    }
    async All_Tab() {
        await this.allTab.waitFor({ state: 'visible' })
        await this.allTab.click();
        await this.page.waitForTimeout(500);

    }
    async Active_Tab() {
        await this.activeTab.waitFor({ state: 'visible' })
        await this.activeTab.click();
        await this.page.waitForTimeout(500);

    } async Maintenance_Tab() {
        await this.maintananceTab.waitFor({ state: 'visible' })
        await this.maintananceTab.click();
        await this.page.waitForTimeout(500);

    }
    async CreateAllocation(assetname, User, area, Rtselect, apselect, startDate, startmonth, startyear, endDate, endmonth, endyear) {
        await this.AddAllocation_Button();
        await this.AssetName(assetname);
        await this.User(User);
        await this.Area(area);
        await this.Roomtype(Rtselect);
        await this.AllocationPurpose(apselect);
        await this.AllocationFrom_Date(startDate, startmonth, startyear);
        await this.AllocationTo_Date(endDate, endmonth, endyear);
        await this.Submit();
        await this.ConfirmYes();


    } async AddAllocation_Button() {

        await this.addAssetAllocation.waitFor({ state: 'visible' })
        await this.addAssetAllocation.click();
        await this.page.waitForTimeout(500)
    }
    async AssetName(ass) {
        await this.selectAsset.click();
        const asname = ass.toLowerCase()
        const select = this.page.locator(`//span/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asname}')]`);
        await select.scrollIntoViewIfNeeded()
        await select.waitFor({ state: 'visible' })
        await select.click();
    }

    async User(User) {
        await this.user.waitFor({ state: 'visible' })

        await this.user.fill(User);
        const uname = User.toLowerCase()
        const select = this.page.locator(`//ul[@id='search-formul-list-one']/li/b[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]`)
        await select.waitFor({ state: 'visible' })
        await select.click();
    }

    async Area(area) {
        const Are = area.toLowerCase()

        const select = this.page.locator(`//input[@name='assetSource']/../label/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Are}')]`)
        await select.waitFor({ state: 'visible' })
        await select.click();
    }
    async Roomtype(select) {
        await this.page.waitForTimeout(1000)
        // const Options = await this.page.locator("//*[@id='locationType']").allTextContents();
        // console.log("Dropdown options:", Options);
        // const match = Options.find(opt => opt.toLowerCase() == select.toLowerCase());

        await this.page.selectOption("//*[@id='locationType']", { label: select });


    }
    async Room(select) {



        await this.page.selectOption("//*[@id='currentLocation']", { label: select });


    }
    async AllocationPurpose(select) {


        await this.page.selectOption("//*[@id='allocationPurpose']", { label: select });
    }

    async AllocationFrom_Date(date, month, year, isEndDate = false) {
        await this.startDate.click();
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
            const nxtYearBtn = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[${calendarIndex}]`);

            for (let i = 0; i < Math.abs(yearDiff); i++) {
                await nxtYearBtn.click();
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
        const selectedValue = await this.startDate.inputValue();
        console.log(`Selected date: ${selectedValue}`);
    }

    async AllocationTo_Date(date, month, year, isEndDate = true) {
        await this.endDate.click();
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
            const nxtYearBtn = this.page.locator(`(//button[@class='el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right'])[${calendarIndex}]`);

            for (let i = 0; i < Math.abs(yearDiff); i++) {
                await nxtYearBtn.click();
                await this.page.waitForTimeout(500);
            }
        }

        // Updated month selection with index-based locators
        await this.page.waitForTimeout(500)
        await monthLabel.click();
        await this.page.waitForTimeout(1000);

        // Updated month selector with better visibility check
        const monthLocator = `(//div[@class='el-picker-panel__content']//a[contains(text(),'${month}')])[${calendarIndex}]`;
        await this.page.waitForSelector(monthLocator);
        await this.page.locator(monthLocator).click();
        await this.page.waitForTimeout(1000);


        const exactDateLocator = `(//div[@class='el-picker-panel__content']//td[contains(@class,'available')]//span[contains(text(),'${date}')])[${calendarIndex}]`;
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
        const selectedValue = await this.endDate.inputValue();
        console.log(`Selected date: ${selectedValue}`);
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

    async UserNameFilter(filter) {
        await this.page.waitForTimeout(1000);
        const Fil_but = this.page.locator(`//button[@class='btn dropdown-toggle btn-secondary' and contains(text(),'User Name')]`)
        await Fil_but.waitFor({ state: 'visible' })
        await Fil_but.click({ force: true });

        const Filter = this.page.locator(`//input[contains(@value,'${filter}')]`)

        await Filter.waitFor({ state: 'visible' })
        await Filter.click({ force: true });
        await this.page.waitForTimeout(500);
    }



    async View_Allocation(unam, name, code) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
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
                //View With Username.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username, AssetName and AssetCode..
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
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
    //View with Tab Navigation
    async View_AssTab(unam, name, code) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        const locatorOptions = [
            {
                //View With AssetCode.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With UserName and Asset Name.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username, AssetName and AssetCode.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='allocationstatus']//span`),
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            }
        ];
        for (const { status, view } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const viewCount = await view.count();
            if (viewCount !== 1) continue;

            const isVisible = await view.isVisible();
            if (isVisible) {
                const statusText = (await status.textContent())?.trim();
                if (statusText?.toLowerCase() === 'active') {
                    await this.Active_Tab();
                } else {
                    await this.Maintenance_Tab();
                }

                await view.click();
                await this.page.waitForTimeout(2000)
                return;
            }
        }

    }

    async Edit_Asset(unam, name, code) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
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
                //Edit With Username.
                Edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username and AssetName.
                Edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetName.
                Edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username, AssetName and AssetCode..
                Edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
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

    async Delete_Asset(Id, name, code) {
        const assId = Id.toLowerCase()
        const assname = name.toLowerCase()
        const asscode = code.toLowerCase()
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        const locatorOptions = [
            {
                //Edit With AssetCode.
                del: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
            },
            {
                //Edit With AssetName and AssetCode.
                del: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
            },
            {
                //Edit With Username.
                del: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
            },
            {
                //Edit With Username and AssetName.
                del: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)

            },
            {
                //Edit With AssetName.
                del: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
            },
            {
                //Edit With Username, AssetName and AssetCode..
                del: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
            }
        ];

        for (const { del } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const delCount = await del.count();
            if (delCount !== 1) continue;

            const isVisible = await del.isVisible();
            if (isVisible) {
                await del.waitFor({ state: 'visible' });
                await del.click();
                return;
            }

        }
        await this.page.waitForTimeout(500)
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























}