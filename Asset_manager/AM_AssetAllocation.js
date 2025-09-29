
exports.AM_Allocation = class AM_Allocation {

    constructor(page) {
        this.page = page;   
        //Select Asset Module(AssetAllocation)
        this.hoverAction1 = page.locator("//div[text()='Asset Management']");
        this.tabAction = page.locator("//div[text()='Asset Management']")
        // Click Action
        this.backArrow = page.locator("(//*[name()='svg' and @focusable='false'])[12]");
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-2 btn-secondary']")
        this.cancelNo = page.locator("//span[contains(text(), 'No')]")
        this.cancelYes = page.locator("//span[contains(text(), 'Yes')]")
        this.cancelIcon = page.locator('i.el-message-box__close.el-icon-close');
        this.submit = page.locator("//span[contains(text(),'Submit')]")
        this.submitNo = page.locator("(//span[contains(text(), 'No')])[3]")
        this.submitYes = page.locator("//span[contains(text(), 'Yes')]")
        this.submitIcon = page.locator('i.el-message-box__close.el-icon-close');

        //Create - AddAssetAllocation
        this.addAssetAllocation = page.locator("//button[contains(text(),'Add Asset Allocation')]");
        this.SelectAsset = page.locator(".multiselect__tags");
        this.user = page.locator("#searchInput")
        this.Roomtype = page.locator("#locationType")
        this.startDate = page.locator('#startDate');
        this.endDate = page.locator('#endDate');

        //Tabs
        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");
        this.assetCode = page.locator("#assetCode")
        this.viewback = page.locator("(//*[name()='svg' and @class='arrow-icon svg-inline--fa fa-arrow-left fa-w-14'])");
    }

    async Select_AssetModule() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 1; i++) {
            await this.tabAction.press('Tab');;
        }
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAssetAllocation.hover();
        await this.page.waitForTimeout(1000);


    }
    async addAssetllocation() {
        const assetLocator = "//button[contains(text(),'Add Asset Allocation')]";
        await this.page.waitForTimeout(2000);
        await this.page.locator(assetLocator).click();
        await this.backArrow.click();
        await this.page.locator(assetLocator).click();
        await this.cancel.click();
        await this.cancelIcon.click();
        await this.cancel.click();
        await this.cancelNo.click();
        await this.cancel.click();
        await this.cancelYes.click();
        await this.page.locator(assetLocator).click();
        await this.submit.click();
        await this.backArrow.click();

    }

    async createAssetAllocation() {
        const Asset = JSON.parse(JSON.stringify(require('../Utils/AssetAllocationUtils.json')));
        const { assetname, User } = Asset[0];
        await this.addAssetAllocation.click();
        await this.SelectAsset.click();
        //  await this.page.selectOption("//*[@data-selected='Selected']", { label: 'Head Light (13)' });
        await this.page.locator(`//ul[@class='multiselect__content']/li/span/span[contains(., '${assetname}')]`).click();
        await this.user.fill(User);
        await this.page.waitForTimeout(2000);
        await this.page.locator(`//ul[@id='search-formul-list-one']/li/b[contains(.,'${User}')]`).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator("//span[text()='Room Type']/parent::label").click();
        await this.page.waitForTimeout(1000);
        await this.page.selectOption("//*[@id='locationType']", { label: 'TestCages' });
        await this.page.waitForTimeout(1000);
        await this.page.selectOption("//*[@id='allocationPurpose']", { label: 'General Use' });
        await this.page.waitForTimeout(1000);
        await this.startDate.click()
        await this.page.waitForTimeout(1000);
        await this.page.locator("//td[@class='available today']/div").click();
        await this.endDate.click();
        await this.page.waitForTimeout(1000);

        await this.page.locator("(//*[@class='available']/div/span[contains(text(),'31')])[2]").click();
        // await this.page.locator("(//span[@class='el-date-picker__header-label'])[4]").click();
        // await this.page.locator("(//span[@class='el-date-picker__header-label'])[4]").click();
        // await this.page.locator("(//span[@class='el-date-picker__header-label'])[4]").click();
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.submitIcon.click();
        await this.submit.click();
        await this.submitNo.click();
        await this.submit.click();
        await this.page.waitForTimeout(1000);
        await this.submitYes.click();
        await this.page.waitForTimeout(1000);

    }

    async Tab_handel(assetCode) {

        await this.activeTab.click();

        await this.maintananceTab.click();
        await this.page.waitForTimeout(1000);

        await this.allTab.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(`.ag-body-horizontal-scroll-viewport`).evaluate(el => {

            el.scrollLeft = el.scrollWidth;
        });
        await this.page.waitForTimeout(2000);
        const viewAsset = await this.page.locator(`//*[text()='${assetCode}']/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`);
        viewAsset.click();
        await this.page.waitForTimeout(1000);
        await this.viewback.click();
        await this.page.waitForTimeout(1000);
        const editAsset = this.page.locator(`//*[text()='${assetCode}']/following-sibling::div[@col-id='action']//button[@class='btn edit-btn btn-secondary']`);
        editAsset.click();
        await this.backArrow.click();
        await this.page.waitForTimeout(1000);
    }























}