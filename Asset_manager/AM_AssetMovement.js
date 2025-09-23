exports.AM_AssetMovement = class AM_AssetMovement {

    constructor(page) {

        this.page = page;
        //Select Asset Module(AssetMovement)
        this.AddMovement = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.hoverAction1 = page.locator("//div[text()='Asset Management']");
        this.tabAction = page.locator("//div[text()='Asset Management']")

        // Click Action
        this.backArrow = page.locator("(//*[name()='svg' and @focusable='false'])[12]");
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.cancelNo = page.locator("//span[contains(text(), 'No')]")
        this.cancelYes = page.locator("//span[contains(text(), 'Yes')]")
        this.cancelIcon = page.locator('i.el-message-box__close.el-icon-close');
        this.submit = page.locator("//button[contains(text(),'Submit')]")
        this.submitNo = page.locator("(//span[contains(text(), 'No')])")
        this.submitYes = page.locator("//span[contains(text(), 'Yes')]")
        this.submitIcon = page.locator('i.el-message-box__close.el-icon-close');

        //Create - AddAssetAllocation
        this.ClickSelectAsset = page.locator(".multiselect__tags");
        const Movement = JSON.parse(JSON.stringify(require('../Utils/AssetMovementUtils.json')));
        const { assetname, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType,
            DestinationRoom, ExternalDestination, Purpose } = Movement[0];
        //Select -AssetName
        this.SelectAsset = page.locator(`//ul[@class='multiselect__content']/li/span/span[contains(., '${assetname}')]`);
        //MovementType
        this.MovementType = page.locator(`//span[text()='${MovementType}']`)
        //TransferType
        this.TransferType = page.locator(`//span[contains(text(),'${TransferType}')]`)
        //Area
        this.Area = page.locator(`//*[@class='py-0 col-md-6 col-12']/label[text()='Area']/following-sibling::div//span[text()='${Area}']`)
        //Room Type
        this.RoomType = page.selectOption("//*[@id='sourceLocationType']", { label: `${RoomType}` })
        //Room  
        this.Room = page.selectOption("//*[@id='sourceLocation']", { label: `${Room}` })
        //Destination Area
        this.DestinationArea = page.locator(`//*[@class='py-0 col-md-6 col-12']/label[text()='Destination Area']/following-sibling::div//span[text()='${DestinationArea}']`)
        //Destination Room Type
        this.DestinationRoomType = page.selectOption("//*[@id='destinationLocationType']", { label: `${DestinationRoomType}` });
        //Destination Room
        this.DestinationRoom = page.selectOption("//*[@id='destinationLocationType']", { label: `${DestinationRoom}` });
        //External Destination
        this.ExternalDestination = page.fill("#externalDestination", `${DestinationRoom}`);
        //Return Date
        this.ReturnDate = page.fill('#returnDate', '26/08/2025').then(() => page.press('#returnDate', 'Enter'));
        //Purpose
        this.Purpose = page.selectOption("//*[@id='returnPurpose']", { label: `${Purpose}` });
        //Gate Pass
        this.GatePass = page.fill("#getPassId", "Null");


        //Tabs
        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");
        this.assetCode = page.locator("#assetCode")
        this.viewback = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']");





    }

    async Select_AssetModule() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 2; i++) {
            await this.tabAction.press('Tab');;
        }
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.AddMovement.hover();
        await this.page.waitForTimeout(1000);
    }
    async Click_AddAssetMovement() {
        const assetLocator = "//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']"
        await this.page.waitForTimeout(3000);
        await this.page.locator(assetLocator).click();
        await this.backArrow.click();
        await this.page.locator(assetLocator).click();
        await this.cancel.click();
        await this.cancelIcon.click();
        await this.cancel.click();
        await this.cancelNo.click();
        await this.cancel.click();
        await this.cancelYes.click();
        await this.waitForTimeout(1000)
        await this.page.locator(assetLocator).click();
        await this.submit.click();
        await this.waitForTimeout(1000)
        await this.backArrow.click();

    }

    async createAssetMovement() {

        const Movement = JSON.parse(JSON.stringify(require('../Utils/AssetMovementUtils.json')));
        const { assetname, MovementType, TransferType, Area, RoomType, Room, DestinationArea, DestinationRoomType,
            DestinationRoom, ExternalDestination, Purpose } = Movement[0];
        await this.AddMovement.click();
        await this.page.waitForTimeout(1000)
        await this.ClickSelectAsset.click();
        await this.page.waitForTimeout(4000)
        await this.SelectAsset.click();
        const CheckRadio = await this.page.locator("#sourceType_BV_option_0").isChecked();
        console.log("Area is :" + CheckRadio);

        if (CheckRadio == false) {

            if (MovementType === "Internal") {
                await this.MovementType.click();
                await this.TransferType.click();

                await this.DestinationArea.click();
                await this.DestinationRoomType;
                await this.Purpose;
                await this.GatePass;
                await this.page.waitForTimeout(1000)
                await this.submit.click();
                await this.page.waitForTimeout(1000)
                await this.submitNo.click();
                await this.page.waitForTimeout(1000)
                await this.submit.click();
                await this.submitYes.click();
                console.log("1.Successfully Moved the Asset to Internal maintanance");
            } else {
                await this.MovementType.click();
                await this.TransferType.click();
                await this.Area;
                await this.RoomType;
                await this.Room;
                await this.DestinationArea.click();
                await this.DestinationRoomType;
                await this.Purpose;
                await this.GatePass;
                await this.page.waitForTimeout(2000)
                console.log("2.Successfully Moved the Asset to Internal maintanance");
            }
            if (MovementType === "External") {
                await this.page.waitForTimeout(1000)
                await this.MovementType.click();
                await this.page.waitForTimeout(1000)
                await this.TransferType.click();
                await this.page.waitForTimeout(1000)
                await this.ExternalDestination;
                await this.page.waitForTimeout(2000)
                await this.ReturnDate;
                await this.Purpose;
                await this.GatePass;
                console.log("Successfully Moved the Asset to External Maintanance");


            }
        } else {
            console.log("Failed to Move the Asset Permanently");

        }
    }

    async Tab_handel() {

        await this.activeTab.click();

        await this.maintananceTab.click();
        await this.page.waitForTimeout(1000);

        await this.allTab.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        await this.page.waitForTimeout(2000);
        const viewAsset = await this.page.locator(`//*[text()='6890']/following-sibling::div[@col-id='externaldestination']/following-sibling::div[@col-id='CreatedAt' and text()='26/08/2025']/following-sibling::div[@col-id='action']/div[@id='editdelete-rendered']`);
        viewAsset.click();
        await this.page.waitForTimeout(2000);
        await this.viewback.click();
        await this.page.waitForTimeout(1000);

    }



}
