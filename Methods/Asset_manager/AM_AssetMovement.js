exports.AM_AssetMovement = class AM_AssetMovement {

    constructor(page) {

        this.page = page;
        //Select Asset Module(AssetMovement)
        this.AddMovement = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.Action = page.locator("//div[text()='Asset Management']");

        //
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.submit = page.locator("//button[contains(text(),'Submit')]")
        this.complete = page.locator("//button[contains(text(),'Complete')]")
        this.reason = page.locator("//textarea[@id='approval-reason']")

        //Confim message 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //Search and Download
        this.search = page.locator("//div[@class='search-grid px-0 col']/div/input[@id='sellerQuickFilter']")
        this.download = page.locator("//button[@data-test='download-button']")

        //Tabs
        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");

        //Create - AddAssetAllocation
        this.selectAsset = page.locator(".multiselect__tags");



    }

    async Select_AssetMovement() {
        await this.Action.waitFor({ state: 'visible' })
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(1000);
        for (var i = 0; i <= 2; i++) {
            await this.Action.press('Tab');;
        }
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.AddMovement.hover();
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

    async AddMovement_Button() {

        await this.AddMovement.click();

    } async AssetName(ass) {
        await this.selectAsset.click();
        const asname = ass.toLowerCase()
        const select = this.page.locator(`//span/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asname}')]`);
        await select.scrollIntoViewIfNeeded()
        await select.waitFor({ state: 'visible' })
        await select.click();
    }

    async MovementType(area) {
        var Are = area.toLowerCase()

        const select = this.page.locator(`//input[@name='movementType']/../label/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Are}')]`)
        await select.waitFor({ state: 'visible' })
        await select.click();

    } async TransferType(area) {
        const Are = area.toLowerCase()

        const select = this.page.locator(`//input[@name='transferType']/../label/span[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Are}')]`)
        await select.waitFor({ state: 'visible' })
        await select.click();

    } async Area(area) {
        await this.page.waitForTimeout(500)
        const Are = area.toLowerCase()

        const select = this.page.locator(`//input[@name='sourceType']/../label/span[translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')= '${Are}']`)
        await select.waitFor({ state: 'visible' })
        await select.click({ force: true });
    }
    async Roomtype(select) {
        await this.page.waitForTimeout(500)

        await this.page.selectOption("//*[@id='sourceLocationType']", { label: select });


    }
    async Room(select) {
        await this.page.waitForTimeout(500)


        await this.page.selectOption("//*[@id='sourceLocation']", { label: select });


    } async DestinationArea(area) {
        const Are = area.toLowerCase()

        const select = this.page.locator(`//input[@name='destinationType']/../label/span[translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')= '${Are}']`)
        await select.waitFor({ state: 'visible' })
        await select.click();
    }
    async DestinationRoomType(select) {
        await this.page.waitForTimeout(500)

        await this.page.selectOption("//*[@id='destinationLocationType']", { label: select });


    } async DestinationRoom(select) {
        await this.page.waitForTimeout(500)

        await this.page.selectOption("//*[@id='destinationLocation']", { label: select });


    }
    async ExternalDestination(ED) {
        await this.page.waitForTimeout(500)

        const Exdesti = this.page.locator("#externalDestination");
        await Exdesti.waitFor({ state: 'visible' })
        await Exdesti.fill(`${ED}`)


    }

    async ReturnDate(date, month, year, isEndDate = false) {
        const returnD = this.page.locator("#returnDate")
        await returnD.click();
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
        const selectedValue = await returnD.inputValue();
        console.log(`Selected date: ${selectedValue}`);
    }
    async Purpose(select) {
        await this.page.waitForTimeout(500)

        await this.page.selectOption("//*[@id='returnPurpose']", { label: select });

    }
    async GatePass(GP) {
        await this.page.waitForTimeout(500)

        const Exdesti = this.page.locator("#getPassId");
        await Exdesti.fill(`${GP}`)
    }
    async Search(fil) {
        console.log("Search", fil);

        await this.page.waitForTimeout(500);
        await this.search.waitFor({ state: 'visible' })
        await this.search.fill(fil, { force: true });
        await this.page.waitForTimeout(1000);
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


    async Internal(DAselect, DRTselect, DRselect) {
        await this.DestinationArea(DAselect);

        if (DAselect.toLowerCase() == "room") {
            await this.DestinationRoomType(DRTselect);
            await this.DestinationRoom(DRselect);

        } else {
            await this.DestinationRoomType(DRTselect);

        }
    }
    async External(ExDes, RDate, RMonth, RYear) {
        await this.ExternalDestination(ExDes);
        await this.ReturnDate(RDate, RMonth, RYear);

    }
    async EnableArea(area, Rtselect, Rselect) {

        await this.Area(area);

        if (area.toLowerCase() == "room") {
            await this.Roomtype(Rtselect);
            await this.Room(Rselect);
        } else {
            await this.Roomtype(Rtselect);
        }


    }
    async CreateMovement(assetname, Mvtype, type, area, Rtselect, Rselect, DAselect, DRTselect, DRselect, ExDes, RDate, RMonth, RYear, purpose, Gpass) {



        await this.AddMovement_Button();
        await this.AssetName(assetname);
        await this.MovementType(Mvtype);
        await this.TransferType(type);

        const CheckRadio = await this.page.locator("#sourceType_BV_option_0").isChecked();
        console.log("Area is :" + CheckRadio);


        if (CheckRadio == true) {
            if (Mvtype.toLowerCase() == "internal") {
                await this.Internal(DAselect, DRTselect, DRselect)
            } else {
                await this.External(ExDes, RDate, RMonth, RYear)
            }
            //If the Area is Not Selected
        } else if (CheckRadio == false) {
            console.log(Mvtype);

            if (Mvtype.toLowerCase() == "internal") {
                await this.EnableArea(area, Rtselect, Rselect)
                await this.Internal(DAselect, DRTselect, DRselect)
            } else {
                await this.EnableArea(area, Rtselect, Rselect)
                await this.External(ExDes, RDate, RMonth, RYear)
            }

        }

        await this.Purpose(purpose);
        await this.GatePass(Gpass);

    }

    async View_Movement(unam, name, code, mtype, Ttype, date) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const MoveTy = mtype.toLowerCase();
        const TransTy = Ttype.toLowerCase();
        const Cdate = date.toLowerCase();
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
                //View With Username and AssetCode
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username and AssetName
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },

            {
                //View With Username, AssetName and AssetCode
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With AssetName,MovementType and TransferType.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With AssetName,MovementType, TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With AssetName and Created Date.
                view: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With AssetCode,MovementType, TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With AssetCode,MovementType and TransferType.
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With AssetCode and Created Date.
                view: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With Username,AssetName and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With Username,AssetName,AssetCode and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With Username,AssetCode and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)

            },
            {
                //View With Username, AssetName ,MovementType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },

            {
                //View With Username, AssetName , AssetCode,MovementType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username, AssetName ,TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username, AssetName , AssetCode,TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {   //View With Username, AssetCode ,MovementType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username , AssetCode,TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
            },
            {
                //View With Username, AssetName , AssetCode,MovementType,TransferType and Created Date.
                view: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
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
                await this.page.waitForTimeout(3000)
                return;
            }

        }
        // //For Page Loading Purpose
        // const load = this.page.locator("//div[@id='discount-master-sidebar']//div[@class='b-sidebar-body']")
        // await load.waitFor({ state: 'visible' });
        // await this.page.waitForTimeout(3000)

    }
    //View with Tab Navigation
    async View_AssTab(unam, name, code, mtype, Ttype, date) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const MoveTy = mtype.toLowerCase();
        const TransTy = Ttype.toLowerCase();
        const Cdate = date.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        const locatorOptions = [
            {
                //View With AssetCode.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With AssetName and AssetCode.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With AssetName.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username and AssetCode
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username and AssetName
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username, AssetName and AssetCode
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With AssetName,MovementType and TransferType.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With AssetName,MovementType, TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With AssetName and Created Date.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With AssetCode,MovementType, TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With AssetCode,MovementType and TransferType.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With Username,AssetName and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With Username,AssetName,AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With Username,AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //View With Username, AssetName ,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },

            {
                //View With Username, AssetName , AssetCode,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username, AssetName ,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username, AssetName , AssetCode,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {   //View With Username, AssetCode ,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username , AssetCode,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //View With Username, AssetName , AssetCode,MovementType,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            }

        ];
        for (const { status } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const statusCount = await status.count();
            if (statusCount !== 1) continue;

            const isVisible = await status.isVisible();
            if (isVisible) {
                const statusText = (await status.textContent())?.trim();
                if (statusText?.toLowerCase() === 'active') {
                    await this.Active_Tab();
                } else {
                    await this.Maintenance_Tab();
                }

                await this.View_Movement(unam, name, code, mtype, Ttype, date);
                await this.page.waitForTimeout(3000)
                return;
            }
        }

        //For Page Loading Purpose
        const load = this.page.locator("//div[@class='sidebar-container from-field1']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(3000)

    }
    async Edit_Movement(unam, name, code, mtype, Ttype, date) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const MoveTy = mtype.toLowerCase();
        const TransTy = Ttype.toLowerCase();
        const Cdate = date.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        const locatorOptions = [
            {
                //Edit With AssetCode.
                edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetName and AssetCode.
                edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetName.
                edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username and AssetCode
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username and AssetName
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },

            {
                //Edit With Username, AssetName and AssetCode
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With AssetName,MovementType and TransferType.
                edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetName,MovementType, TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetName and Created Date.
                edit: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetCode,MovementType, TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetCode,MovementType and TransferType.
                edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With AssetCode and Created Date.
                edit: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With Username,AssetName and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With Username,AssetName,AssetCode and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With Username,AssetCode and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)

            },
            {
                //Edit With Username, AssetName ,MovementType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },

            {
                //Edit With Username, AssetName , AssetCode,MovementType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username, AssetName ,TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username, AssetName , AssetCode,TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {   //Edit With Username, AssetCode ,MovementType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username , AssetCode,TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            },
            {
                //Edit With Username, AssetName , AssetCode,MovementType,TransferType and Created Date.
                edit: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
            }
        ];

        for (const { edit } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            const editCount = await edit.count();
            if (editCount !== 1) continue;

            const isVisible = await edit.isVisible();
            if (isVisible) {
                await edit.waitFor({ state: 'visible' });
                await edit.click();
                await this.page.waitForTimeout(3000)
                return;
            }

        }
        //For Page Loading Purpose
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='presentation']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000)

    }
    //Edit with Tab Navigation
    async Edit_AssTab(unam, name, code, mtype, Ttype, date) {
        const uname = unam.toLowerCase();
        const assname = name.toLowerCase();
        const asscode = code.toLowerCase();
        const MoveTy = mtype.toLowerCase();
        const TransTy = Ttype.toLowerCase();
        const Cdate = date.toLowerCase();
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        const locatorOptions = [
            {
                //Edit With AssetCode.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With AssetName and AssetCode.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With AssetName.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username and AssetCode
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username and AssetName
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='status']//span`)
            },

            {
                //Edit With Username, AssetName and AssetCode
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With AssetName,MovementType and TransferType.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With AssetName,MovementType, TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With AssetName and Created Date.
                status: this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With AssetCode,MovementType, TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With AssetCode,MovementType and TransferType.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With Username,AssetName and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With Username,AssetName,AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With Username,AssetCode and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)

            },
            {
                //Edit With Username, AssetName ,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },

            {
                //Edit With Username, AssetName , AssetCode,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username, AssetName ,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username, AssetName , AssetCode,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {   //Edit With Username, AssetCode ,MovementType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username , AssetCode,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            },
            {
                //Edit With Username, AssetName , AssetCode,MovementType,TransferType and Created Date.
                status: this.page.locator(`//div[@col-id='username' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${uname}')]/following-sibling::div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='assetCode' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${asscode}')]/following-sibling::div[@col-id='movementtype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${MoveTy}')]/following-sibling::div[@col-id='transfertype' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${TransTy}')]/following-sibling::div[@col-id='CreatedAt' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${Cdate}')]/following-sibling::div[@col-id='status']//span`)
            }

        ];
        for (const { status } of locatorOptions) {
            // Skip if locator is too generic (e.g., asset code is empty)
            console.log(status);

            const statusCount = await status.count();
            if (statusCount !== 1) continue;

            const isVisible = await status.isVisible();
            console.log(isVisible);
            if (isVisible) {
                const statusText = (await status.textContent())?.trim();
                if (statusText?.toLowerCase() == 'active') {
                    await this.Active_Tab();
                } else if (statusText?.toLowerCase() == 'maintenance') {
                    await this.Maintenance_Tab();
                }

                await this.Edit_Movement(unam, name, code, mtype, Ttype, date);
                await this.page.waitForTimeout(3000)
                return;
            }
        }

        //For Page Loading Purpose
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='presentation']")
        await load.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000)

    }
    async Complete() {
        await this.complete.waitFor({ state: 'visible' });
        await this.complete.click();
        await this.page.waitForTimeout(2000)
    }
    async Reason(fill) {
        await this.reason.waitFor({ state: 'visible' });
        await this.reason.fill(fill);
    }

    async Complete_Maintenance(unam, name, code, mtype, Ttype, date, reason) {
        await this.Edit_AssTab(unam, name, code, mtype, Ttype, date);
        await this.Complete();
        await this.Reason(reason);
        await this.Submit();
        await this.ConfirmYes();

    }

}