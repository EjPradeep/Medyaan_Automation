exports.AM_Assetmaster = class AM_Assetmaster {

    constructor(page) {
        this.page = page;
        //Select Asset Module(AssetAllocation)
        this.hoverAction1 = page.locator("//div[text()='Asset Management']");
        this.tabAction = page.locator("//div[text()='Asset Management']")


        this.search = page.locator("//input[@placeholder='Search']")
        this.download = page.locator("//button[@class='btn mr-2 btn-primary']")

        //
        this.allTab = page.locator("//div[contains(text(),'Active')]/../div/following-sibling::div[contains(text(),'All')]");
        this.activeTab = page.locator("//div[contains(text(),'Active')]");
        this.maintananceTab = page.locator("//div[contains(text(),'Maintenance')]");
        this.disposedTab = page.locator("//div[contains(text(),'Disposed')]");
        this.assetCode = page.locator("#assetCode")
        this.backArrow = page.locator("(//div[@class='col']/*[@data-icon='arrow-left'])[2]");

        //view tabs
        this.allocation = page.locator("//div[@class='b-sidebar-body']//div[@class='v-slide-group__content v-tabs-bar__content']/div/following-sibling::div[contains(text(),'Allocation')]")
        this.movement = page.locator("//div[@class='b-sidebar-body']//div[@class='v-slide-group__content v-tabs-bar__content']/div/following-sibling::div[contains(text(),'Movement')]")
        this.Task = page.locator("//div[@class='b-sidebar-body']//div[@class='v-slide-group__content v-tabs-bar__content']/div/following-sibling::div[contains(text(),'Task')]")


    }


    async Select_AssetModule() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        await this.tabAction.press('Tab');;
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.download.hover();
        await this.page.waitForTimeout(1000);
    }

    async All_Tab() {
        await this.allTab.waitFor({ state: 'visible' });

        await this.allTab.click();
        await this.page.waitForTimeout(1000);

    }
    async Active_Tab() {
        await this.activeTab.waitFor({ state: 'visible' });

        await this.activeTab.click();
        await this.page.waitForTimeout(1000);

    }


    async Maintanance_Tab() {
        await this.maintananceTab.waitFor({ state: 'visible' });
        await this.maintananceTab.click();
        await this.page.waitForTimeout(1000);



    } async Disposal_Tab() {



        await this.disposedTab.waitFor({ state: 'visible' });
        await this.disposedTab.click();
        await this.page.waitForTimeout(1000);

    }
    async ViewAsset(Id, assetname) {


        const view = await this.page.locator(`//div[normalize-space()='${Id}' and @col-id='assetId']/following-sibling::*[text()='${assetname}']/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`);
        const viewAsset = await this.page.locator(`//*[text()='${assetname}']/following-sibling::div[@col-id='action']//button[@class='btn view-btn btn-secondary']`);

        const isVisible = await view.isVisible();

        if (isVisible) {
            await view.waitFor({ state: 'visible' });

            await view.click();



        } else {
            await viewAsset.waitFor({ state: 'visible' });

            await viewAsset.click();

        }
        await this.page.waitForTimeout(1000);

    }


    async ViewAllocation() {
        await this.allocation.waitFor({ state: 'visible' });

        await this.allocation.click();
        await this.page.waitForTimeout(1000);

    }
    async ViewMovement() {
        await this.movement.waitFor({ state: 'visible' });

        await this.movement.click();
        await this.page.waitForTimeout(1000);

    } async ViewTask() {
        await this.Task.waitFor({ state: 'visible' });

        await this.Task.click();
        await this.page.waitForTimeout(1000);

    }

    async BackArrow() {
        await this.backArrow.waitFor({ state: 'visible' });

        await this.backArrow.click();
        await this.page.waitForTimeout(1000);

    }

    async Download() {

        await this.download.waitFor({ state: 'visible' });
        await this.download.click();
        await this.page.waitForTimeout(1000);

    }

    async Search(search) {

        await this.search.waitFor({ state: 'visible' });
        await this.search.fill(search);
        await this.page.waitForTimeout(1000);

    }



}