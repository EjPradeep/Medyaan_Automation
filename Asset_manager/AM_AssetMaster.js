
exports.AM_Assetmaster = class AM_Assetmaster {



    constructor(page) {

        //clickAddasset
        this.page = page;
        this.addAsset = page.locator("//button[@class='btn primary-btn add-btn-size mr-2 btn-secondary']");
        this.backArrow = page.locator("(//*[name()='svg' and @focusable='false'])[12]");
        this.cancel = page.locator("//button[@class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']")
        this.cancelNo = page.locator("//span[contains(text(), 'No')]")
        this.cancelYes = page.locator("//span[contains(text(), 'Yes')]")
        this.cancelIcon = page.locator('i.el-message-box__close.el-icon-close');
        this.submit = page.locator("//span[contains(text(),'Submit')]")
        this.submitNo = page.locator("(//span[contains(text(), 'No')])[2]")
        this.submitYes = page.locator("//span[contains(text(), 'Yes')]")
        this.submitIcon = page.locator('i.el-message-box__close.el-icon-close');


        //Create Asset
        this.assetName = page.locator('#name');
        this.assetCode = page.locator('#assetCode');
        this.categoryName = page.locator("//*[@class=' text-capitalize custom-select']");
        this.purchaseAmount = page.locator('#assetAmount');
        this.purchaseDate = page.locator('#purchaseDate');
        this.Images = page.locator('#multipleFileDropbox');

        //AM_assetMaster_tabHandle

        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");
        this.disposedTab = page.locator("//div[contains(text(),'Disposed')]");
        this.assetCode = page.locator("#assetCode")
        //this.assetCode = page.locator('span.ag-header-cell-text', { label: 'Asset Code' });
        this.viewback = page.locator("(//*[name()='svg' and @class='fa-xs back-arrow svg-inline--fa fa-arrow-left fa-w-14'])[2]");
   
    }
    async click_addAsset() {
        await this.page.waitForTimeout(3000);
        await this.page.locator("//button[@class='btn primary-btn add-btn-size mr-2 btn-secondary']").click();
       //await this.page.locator(assetLocator).click();
        await this.backArrow.click();
        await this.addAsset.click();
        //await this.page.locator(assetLocator).click();
        await this.cancel.click();
        await this.cancelIcon.click();
        await this.cancel.click();
        await this.cancelNo.click();
        await this.cancel.click();
        await this.cancelYes.click();
        await this.addAsset.click();
        //await this.page.locator(assetLocator).click();
        await this.submit.click();
        await this.backArrow.click();

    }
    async createAsset(addAsset, assetCode) {
        //AssetName
        //await this.page.waitForTimeout(1000);

        await this.addAsset.click();
        await this.assetName.fill(addAsset);
        //AssetCode
        await this.page.waitForTimeout(2000);
        await this.assetCode.fill(assetCode);
        //category
        await this.page.waitForTimeout(1000);

    }
    async createAsset_Categ(purchaseAmount) {

        //Category
        await this.page.selectOption("//*[@class=' text-capitalize custom-select']", { label: 'Other Materials' });


        // const catname = await this.page.$$("//*[@class=' text-capitalize custom-select']");
        // for (const selected of catname) {
        //     if (select === await selected.textContent()) {
        //         await selected.click();
        //         console.log(selected);
        //         break;

        //     }
        // }


        //Purchase Amount
        await this.page.waitForTimeout(1000);

        await this.purchaseAmount.fill(purchaseAmount);


        //Purchase date
        await this.page.waitForTimeout(1000);
        await this.purchaseDate.click()
        await this.page.waitForTimeout(1000);
        await this.page.locator("//td[@class='available today']/div").click()


    }
    //Image

    async imageUpload(filePath) {


        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.Images.click() // This opens the file picker
        ]);

        await fileChooser.setFiles(filePath);
        //submit
        await this.page.waitForTimeout(2000);
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
        // const activeTab=await this.activeTab.waitFor({ state: 'visible' }); 
        // activeTab.click();
        await this.maintananceTab.click();
        await this.page.waitForTimeout(1000);
        await this.disposedTab.click();
        await this.page.waitForTimeout(2000);
        // const all= await this.allTab.waitFor({state:'visible'});
        // all.click();
        await this.allTab.click();
        // const locator = this.page.locator("(//div[contains(normalize-space(text()), 'All')])[2]");
        // await locator.waitFor({ state: 'visible' });
        // await locator.click();
        await this.page.waitForTimeout(2000);
        const viewAsset = await this.page.locator(`//div[text()='${assetCode}']/following-sibling::div/div/div//*[@class='btn view-btn btn-secondary']`);
        viewAsset.click();
        await this.page.waitForTimeout(1000);
        await this.viewback.click();
        await this.page.waitForTimeout(1000);
        const editAsset = this.page.locator(`//div[text()='${assetCode}']/following-sibling::div/div/div//*[@data-icon='pencil-alt']`);
        editAsset.click();
        await this.page.waitForTimeout(2000);
        await this.backArrow.click();
       /* await this.page.waitForTimeout(2000);
        const deleteAsset = await this.page.locator(`//div[text()='${assetCode}']/following-sibling::div/div/div/button/following-sibling::button[@class='btn delete-btn btn-secondary']`);
        deleteAsset.click();
        await this.page.waitForTimeout(1000);
        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
        deleteAsset.click()
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'No' }).click();
        await this.page.waitForTimeout(1000);
        deleteAsset.click();
        await this.page.waitForTimeout(1000);
        await this.cancelYes.click();*/
   }




}












