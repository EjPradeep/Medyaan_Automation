exports.CompliancePolicy = class CompliancePolicy {

    constructor(page) {
        this.page = page;
        //Select Asset Module(AssetAllocation)
        this.hoverAction = page.locator("//div[text()='Compliance']");
        this.tabAction = page.locator("//div[text()='Compliance']")


        this.search = page.locator("//input[@placeholder='Search']")
        this.download = page.locator("//button[@class='btn mr-2 btn-primary']")

        this.backArrow = page.locator("//div[@class='col']//*[@data-icon='arrow-left']");



    }


    async CompliancePolicy() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction.hover();
        await this.hoverAction.click();
        await this.page.waitForTimeout(2000);
        await this.tabAction.press('Tab')
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.download.hover();
        await this.page.waitForTimeout(1000);
    }


    async ViewPolicy(asset, task) {
        await this.page.waitForTimeout(1000);

        const viewbutton = this.page.locator(`//div[@class="ag-center-cols-container"]/*/div[normalize-space()='${asset}']/following-sibling::*[@col-id="name" and normalize-space()='${task}']/following-sibling::div[@col-id='action']/div/div/*[@class='btn view-btn btn-secondary']`)
        await viewbutton.waitFor({ state: 'visible' });
  
        const description = this.page.locator("#descValue")

        await viewbutton.click()
        await this.page.waitForTimeout(500);
        await description.waitFor({ state: 'visible' });
        
        await description.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

    async BackArrow() {
        await this.backArrow.waitFor({ state: 'visible' });

        await this.backArrow.click();
        await this.page.waitForTimeout(1000);

    }
    async Search(search) {

        await this.search.waitFor({ state: 'visible' });
        await this.search.fill(search);
        await this.page.waitForTimeout(1000);

    }


    async Download() {

        await this.download.waitFor({ state: 'visible' });
        await this.download.click();
        await this.page.waitForTimeout(1000);

    }



}