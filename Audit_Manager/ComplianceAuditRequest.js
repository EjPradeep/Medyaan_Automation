exports.ComplianceRequest = class ComplianceRequest {

    constructor(page) {
        this.page = page
        this.asset_request = page.locator("//a[@class='v-item--active v-list-item--active v-list-item v-list-item--link theme--light']")
        this.compliance_request = page.locator("//a[@class='v-list-item v-list-item--link theme--light']//i[@class='v-icon notranslate mdi mdi-checkbox-marked theme--light']")
        this.pendingtab = page.locator("(//div[@class='v-slide-group__content v-tabs-bar__content']/div/following-sibling::div)[1]")
        this.completetab = page.locator("//div[contains(text(),'Completed')]")
        this.search = page.locator("//input[@placeholder='Search']")

        this.completedbutton=page.locator("//div[@class='text-end d-flex ']/div/following-sibling::div/button/*[@data-icon='handshake']")
        this.download = page.locator("//button[@class='btn mr-2 btn-primary']")

        //Allcheckbox
        this.checkboxall = page.locator(`//span[normalize-space()='Task Name']/../../../../preceding-sibling::div/div/div/following-sibling::div/input`)

    }

    async SelectAuditRequest(auditmodule) {
        const auditrequestmodule = this.page.locator(`//div[contains(text(),'${auditmodule}')]`)

        await auditrequestmodule.waitFor({ state: 'visible' });
        await auditrequestmodule.click(auditmodule);
        await this.download.hover();

        await this.page.waitForTimeout(1000);

    }
    async ComplianceRequest() {
        await this.compliance_request.waitFor({ state: 'visible' });
        await this.compliance_request.click();
        await this.download.hover();
        await this.page.waitForTimeout(1000);

    }

    async PendingTab() {
        await this.pendingtab.waitFor({ state: 'visible' });
        await this.pendingtab.click();
        await this.page.waitForTimeout(1000);

    } async CompletedTab() {
        await this.completetab.waitFor({ state: 'visible' });
        await this.completetab.click();
        await this.page.waitForTimeout(1000);

    }
    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        const load = "//div[@class='ag-body-viewport ag-layout-normal ag-row-no-animation']"

       // await this.page.waitForSelector(load, { state: 'visible', timeout: 12000 });
       
        await this.page.locator(load).waitFor({ state: 'visible' });
        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }
    async Checkbox(taskname) {


        const checkbox = this.page.locator(`//span[normalize-space()='Completed']/parent::div/parent::div/preceding-sibling::div[normalize-space()='${taskname}']/preceding-sibling::div/div/div/div/child::div/input`)
        await checkbox.waitFor({ state: 'visible' });
        await checkbox.click();
        await this.page.waitForTimeout(1000);
    }
    async AllCheckbox() {

        await this.checkboxall.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
        await this.checkboxall.click({ force: true });
        await this.page.waitForTimeout(2000);
    }
    async Completed_Button() {

        await this.completedbutton.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);
        await this.completedbutton.click();
        await this.page.waitForTimeout(2000);
    }






















}