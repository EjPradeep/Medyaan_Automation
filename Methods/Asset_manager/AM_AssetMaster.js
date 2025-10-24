const { log } = require("node:console");

exports.AM_Assetmaster = class AM_Assetmaster {



    constructor(page) {

        //clickAddasset
        this.page = page;
        this.addAsset = page.locator("//button[@class='btn primary-btn add-btn-size mr-2 btn-secondary']");
        this.backArrow = page.locator("//span[@class='sidebar-adminheader']/../preceding-sibling::*[@data-icon='arrow-left']");


        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.submit = page.locator("//span[contains(text(),'Submit')]")


        //Confim message 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //Create Asset
        this.assetName = page.locator('#name');
        this.assetCode = page.locator('#assetCode');
        this.categoryName = page.locator("//*[@class=' text-capitalize custom-select']");
        this.purchaseAmount = page.locator('#assetAmount');
        this.purchaseDate = page.locator('#purchaseDate');
        this.images = page.locator('#multipleFileDropbox');

        //Search and Download
        this.search = page.locator("//div[@class='search-grid px-0 col']/div/input")
        this.download = page.locator("//button[@data-test='download-button']")


        //AM_assetMaster_tabHandle

        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");
        this.disposedTab = page.locator("//div[contains(text(),'Disposed')]");

    }
    async Select_AssetMaster() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(2000);
        await this.Action.press('Tab')
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAsset.hover();
        await this.page.waitForTimeout(2000);
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

    } async Disposed_Tab() {
        await this.disposedTab.waitFor({ state: 'visible' })
        await this.disposedTab.click();
        await this.page.waitForTimeout(500);

    }
    async CreateAsset(assetname, assetcode, Cate, amount, date, month, year, Path) {
        await this.AddAsset_Button();
        await this.AssetName(assetname);
        await this.AssetCode(assetcode);
        await this.CategoryName(Cate);
        await this.PurchaseAmount(amount);
        await this.PurchaseDate(date, month, year);
        await this.ImageUpload(Path);
        await this.Submit();
        await this.ConfirmYes();


    }
    async AddAsset_Button() {
        await this.addAsset.waitFor({ state: 'visible' })
        await this.addAsset.click();
        await this.page.waitForTimeout(500);

    }
    async AssetName(assetname) {
        await this.assetName.waitFor({ state: 'visible' })
        await this.assetName.fill(assetname);
        await this.page.waitForTimeout(500);

    }
    async AssetCode(assetcode) {
        await this.assetCode.waitFor({ state: 'visible' })
        await this.assetCode.fill(assetcode);
        await this.page.waitForTimeout(500);

    }
    async CategoryName(Cate) {

        await this.page.selectOption("//*[@class=' text-capitalize custom-select']", { label: `${Cate}` });
        await this.page.waitForTimeout(500);
    }
    async PurchaseAmount(amount) {
        await this.purchaseAmount.waitFor({ state: 'visible' })
        await this.purchaseAmount.fill(amount);
        await this.page.waitForTimeout(500);

    }

    async PurchaseDate(date, month, year, isEndDate = false) {
        await this.purchaseDate.click();
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
        const selectedValue = await this.purchaseDate.inputValue();
        console.log(`Selected date: ${selectedValue}`);
    }

    async ImageUpload(Path) {

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.images.scrollIntoViewIfNeeded(),

            this.images.click() // This opens the file picker
        ]);

        await fileChooser.setFiles(Path);
        await this.page.waitForTimeout(2000);
        const load = this.page.locator("//div[@class='dz-image']")
        await load.waitFor({ state: 'attached' });

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

        const con = await this.backArrow.count()
        if (await this.backArrow.nth(1).isVisible()) {
            await this.backArrow.nth(1).waitFor({ state: 'visible' });

            await this.backArrow.nth(1).click();

        } else if (await this.backArrow.first().isVisible()) {
            await this.backArrow.first().waitFor({ state: 'visible' });

            await this.backArrow.first().click();
        }
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

    async View_AssTab(Id, name, code) {
        const assId = Id.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();

        const locatorOptions = [
            {
                //View With AssetCode.
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                view: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID.
                view: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                view: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID, AssetName and AssetCode..
                view: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            }
        ];

        for (const { status, view } of locatorOptions) {
            const isVisible = await view.isVisible();
            if (isVisible) {
                await view.waitFor({ state: 'visible' });
                await view.click();
                return;
            }

        }
        //For Page Loading Purpose
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='presentation']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000)

    }
    //View with Tab Navigation
    async View_AssTab(Id, name, code) {
        const assId = Id.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();

        const locatorOptions = [
            {
                //View With AssetCode.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='assetStatus']//span`),
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                status: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='assetStatus']//span`),
                view: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID.
                status: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetStatus']//span`),
                view: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                status: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetStatus']//span`),
                view: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID, AssetName and AssetCode..
                status: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='assetStatus']//span`),
                view: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            }
        ];

        for (const { status, view } of locatorOptions) {
            const isVisible = await view.isVisible();
            if (isVisible) {
                const statusText = (await status.textContent())?.trim();
                if (statusText == 'Active') {
                    await this.Active_Tab();
                } else {
                    await this.Maintenance_Tab();
                }

                await view.waitFor({ state: 'visible' });
                await view.click();
                return;
            }

        }
        //For Page Loading Purpose
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='presentation']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000)

    }

    async Edit_Asset(Id, name, code) {
        const assId = Id.toLowerCase()
        const assname = name.toLowerCase()
        const asscode = code.toLowerCase()
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
       const locatorOptions = [
            {
                //View With AssetCode.
                Edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                Edit: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID.
                Edit: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                Edit: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID, AssetName and AssetCode..
                Edit: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
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
                return;
            }

        }   //For Page Loading Purpose
        const load = this.page.locator("//div[@class='from-field1']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000)
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
                //View With AssetCode.
                del: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName and AssetCode.
                del: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID.
                del: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName.
                del: this.page.locator(`//div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetID, AssetName and AssetCode..
                del: this.page.locator(`//div[@col-id='assetId' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assId}')]/following-sibling::div[@col-id='assetName' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
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












