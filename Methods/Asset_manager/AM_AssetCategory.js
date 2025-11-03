exports.AM_AssetCategory = class AM_AssetCategory {



    constructor(page) {
        this.page = page;
        //Select Asset Module(AssetCategory)
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

        //Crete AssetCategory
        this.addAssetCategory = page.locator("//button[@class='btn primary-btn adddoctor-btn-size btn-secondary']");
        this.categoryName = page.locator("#assetName");
        this.description = page.locator("#description");
        //
        this.errorMessage = page.locator("//div[@class='required']")
    }

    async Select_AssetCategory() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.Action.hover();
        await this.Action.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 4; i++) {
            await this.Action.press('Tab');;
        }
        await this.Action.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.addAssetCategory.hover();
        await this.page.waitForTimeout(2000);
    }

    async AddCategory_Button() {

        await this.addAssetCategory.click();

    }
    async CreateAssetCategory(Acate, Des) {
        await this.AddCategory_Button();
        await this.AssetCategory(Acate);
        await this.Description(Des);

    }
    async AssetCategory(data) {
        await this.categoryName.waitFor({ state: 'visible' })
        await this.categoryName.fill(data);
        await this.page.waitForTimeout(500);
    }
    async ErrorMessage() {
        this.page.locator("//div[@class='required']")
    }
    async Description(data) {
        await this.description.waitFor({ state: 'visible' })
        await this.description.fill(data);
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
    async View_Category(name) {
        let assname = name.toLowerCase();
        let View = this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'view-btn')]`)
        await View.waitFor({ state: 'visible' })
        await View.click()
        await this.page.waitForTimeout(1000);

    }
    async Edit_Category(name) {
        let assname = name.toLowerCase();
        let Edit = this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'edit-btn')]`)
        await Edit.waitFor({ state: 'visible' })
        await Edit.click()
    }
    async Delete_Category(name) {
        let assname = name.toLowerCase();
        let Delete = this.page.locator(`//div[@col-id='assetname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${assname}')]/following-sibling::div[@col-id='action']//button[contains(@class, 'delete-btn')]`)
        await Delete.waitFor({ state: 'visible' })
        await Delete.click()
    }

}