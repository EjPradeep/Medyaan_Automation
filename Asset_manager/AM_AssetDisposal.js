exports.AM_AssetDisposal = class AM_AssetDisposal {

    constructor(page) {

        this.page = page;
        //Select Asset Module(AssetMovement)
        this.hoverAction1 = page.locator("//div[text()='Asset Management']");
        this.tabAction = page.locator("//div[text()='Asset Management']")

        // Click Action
        this.backArrow = page.locator("(//*[name()='svg' and @focusable='false'])[12]");
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-2 btn-secondary']")
        this.cancelNo = page.locator("//span[contains(text(), 'No')]")
        this.cancelYes = page.locator("//span[contains(text(), 'Yes')]")
        this.cancelIcon = page.locator('i.el-message-box__close.el-icon-close');
        this.submit = page.locator("//span[contains(text(),'Submit')]")
        this.submitNo = page.locator("//button[@class='el-button el-button--default el-button--small']")
        this.submitYes = page.locator("//span[contains(text(), 'Yes')]")
        this.submitIcon = page.locator('i.el-message-box__close el-icon-close');

        //CreateDisposal
        this.addDisposal = page.locator("//button[@class='btn primary-btn addproduct-btn-size mr-1 btn-secondary']");
        this.assetName = page.locator(".multiselect__tags");
        this.disposalMethod = page.locator("//*[@id='disposalMethod']");
        this.disposalReason = page.locator("#disposalReason");
        this.disposalValue = page.locator("#disposalValue");
        this.disposalDate = page.locator(".el-input__inner");
        this.Reason = page.locator("#disposalComments");


       

    }
    async Select_AssetModule() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 3; i++) {
            await this.tabAction.press('Tab');;
        }
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addDisposal.hover();
        await this.page.waitForTimeout(1000);
    }

    async Click_AddAssetDisposal() {
        const assetLocator = "//button[@class='btn primary-btn addproduct-btn-size mr-1 btn-secondary']"
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
        await this.page.waitForTimeout(1000)
        await this.page.locator(assetLocator).click();
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.backArrow.click();
    }
    async createAssetDisposal() {
        const Asset = JSON.parse(JSON.stringify(require('../Utils/AssetDisposalUtils.json')));
        const { assetname, disposalmethod, disposalreason, disposalvalue,
            disposaldate, reason } = Asset[0];
        await this.addDisposal.click();
        await this.assetName.click();
        await this.page.waitForTimeout(1000)
        await this.page.locator(`//ul[@class='multiselect__content']/li/span/span[contains(., '${assetname}')]`).click();
        await this.page.waitForTimeout(1000)
        await this.disposalMethod.selectOption({ label: `${disposalmethod}` });
        await this.page.waitForTimeout(1000)
        await this.disposalReason.selectOption({ label: `${disposalreason}` });
        await this.page.waitForTimeout(1000)
        await this.disposalValue.fill(`${disposalvalue}`);
        await this.page.waitForTimeout(1000)

        await this.disposalDate.click().then(() => this.page.waitForTimeout(1500));
        await this.page.locator("//td[@class='available today']/div").click()
        await this.Reason.fill(`${reason}`)
        await this.page.waitForTimeout(2000)
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.submitNo.click();
        await this.page.waitForTimeout(1000)
        await this.submit.click();
        await this.page.waitForTimeout(1000)
      //  await this.submitYes.click();

        /* async function select() {
     
     
                 
                 await this.page.locator(".el-date-picker__header-label").click();
                 
                 await this.page.locator("//*[@class='el-date-picker__header']//button/following-sibling::button/following-sibling::span[text()='2025 ']").click();
                 await this.page.locator("//*[@class='el-picker-panel__content']//table/following-sibling::table/tbody/tr/td[@class='available']/a[text()='2020']").click();
                 await this.page.locator("//*[@class='el-picker-panel__content']//table/following-sibling::table/tbody/tr/td[@class='available today']/a[text()='2025']").click();
     
                }
           await select();*/
    }


}