exports.AM_AssetCategory = class AM_AssetCategory {



    constructor(page) {
        this.page = page;
        //Select Asset Module(AssetCategory)
        this.hoverAction1 = page.locator("//div[text()='Asset Management']");
        this.tabAction = page.locator("//div[text()='Asset Management']")

        // Click Action
        this.backArrow = page.locator("(//*[name()='svg' and @focusable='false'])[12]");
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.cancelNo = page.locator("//span[contains(text(), 'No')]")
        this.cancelYes = page.locator("//span[contains(text(), 'Yes')]")
        this.cancelIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");
        this.submit = page.locator("//span[contains(text(),'Submit')]")
        this.submitNo = page.locator("//button[@class='el-button el-button--default el-button--small']")
        this.submitYes = page.locator("//span[contains(text(), 'Yes')]")
        this.submitIcon = page.locator('i.el-message-box__close el-icon-close');
        this.editBack = page.locator("//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14']")
        //Crete AssetCategory
        this.addAssetCategory = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.categoryName = page.locator("#assetName");
        this.description = page.locator("#description");

    }

    async Select_AssetModule() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 4; i++) {
            await this.tabAction.press('Tab');;
        }
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAssetCategory.hover();
        await this.page.waitForTimeout(2000);
    }

    async Click_AddAssetCategory() {
        const assetLocator = "//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']"
        await this.page.waitForTimeout(2000);
        await this.page.locator(assetLocator).click();
        await this.backArrow.click();
        await this.page.locator(assetLocator).click();
        await this.page.waitForTimeout(1000);
        await this.cancel.click();
        await this.page.waitForTimeout(1000);
        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
        await this.cancel.click();
        await this.page.waitForTimeout(1000);
        await this.cancelNo.click();
        await this.page.waitForTimeout(1000);
        await this.cancel.click();
        await this.page.waitForTimeout(1000);
        await this.cancelYes.click();
        await this.page.waitForTimeout(1000)
        await this.page.locator(assetLocator).click();
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.backArrow.click();
    }

    async CreateAssetCategory() {
        const Category = JSON.parse(JSON.stringify(require('../Utils/AssetCategoryUtils.json')));
        const { CategoryName, Description } = Category[0];
        await this.addAssetCategory.click();
        await this.page.waitForTimeout(1000);
        await this.categoryName.fill(`${CategoryName}`);
        await this.page.waitForTimeout(1000);
        await this.description.fill(`${Description}`);
        await this.page.waitForTimeout(2000);
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.submitNo.click();
        await this.page.waitForTimeout(1000)
        await this.submit.click();
        await this.page.waitForTimeout(1000)
        await this.submitYes.click();
        await this.page.waitForTimeout(2000)
    }
    async ActionFields() {
        const Category = JSON.parse(JSON.stringify(require('../Utils/AssetCategoryUtils.json')));
        const { CategoryName } = Category[0];

        await this.page.waitForTimeout(1000);
        const viewAsset = await this.page.locator(`//div[text()='${CategoryName}']/following-sibling::*[@col-id='action']/*/*/button[@class='btn view-btn btn-secondary']`);
        viewAsset.click();
        await this.page.waitForTimeout(1000);
        await this.backArrow.click();
        await this.page.waitForTimeout(1000);
        const editAsset = this.page.locator(`//div[text()='${CategoryName}']/following-sibling::*[@col-id='action']/*/*/button[@class='btn edit-btn btn-secondary']`);
        editAsset.click();
        await this.page.waitForTimeout(1000);
        await this.editBack.click();
        await this.page.waitForTimeout(1000);
        const deleteAsset = await this.page.locator(`//div[text()='${CategoryName}']/following-sibling::*[@col-id='action']/*/*/button[@class='btn delete-btn btn-secondary']`);
        deleteAsset.click();
        await this.page.waitForTimeout(1000);
        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
        deleteAsset.click()
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'No' }).click();
        await this.page.waitForTimeout(1000);
        /*deleteAsset.click();
        await this.page.waitForTimeout(1000);
        await this.cancelYes.click();
        await this.page.waitForTimeout(1000);*/
    }

}