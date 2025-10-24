exports.History = class History {

    constructor(page) {
        this.page = page;

        this.history = page.locator("//button[@title='History']")

        this.xicon = page.locator("//div[contains(@class,'b-sidebar-outer')]/div/following-sibling::div/header[@class='b-sidebar-header']//button[@aria-label='Close']//*[name()='svg']");

        //
        this.datepicker = page.locator("//div[@class='consumer-filter-date d-none d-md-block']//div[@class='vd-picker__input-icon']/following-sibling::input")
        this.dateclear = page.locator("//button[@aria-label='clearable icon']")

        //search and download
        this.search = page.locator("//input[@id='patientquickFilter' or @id='pharmacyhistoryFilter']")
        this.download = page.locator("//button[@data-test='download-button']")

        //for Page Load Locator
        this.loaded = page.locator("//div[@class='v-window__container']//div//div//div//div[@role='grid']")

        //Back button
        this.backbut = page.locator(`//button[@class='btn secondary-btn back-btn-size btn-secondary' or @class='cancelbtn-color']`)
        const backcount = this.backbut.count();
        const backindex = backcount >= 2 ? 2 : 1
        this.back = page.locator(`(//button[@class='btn secondary-btn back-btn-size btn-secondary' or @class='cancelbtn-color'])[${backindex}]`)

        //Print button
        this.print = page.locator("//button[@class='submit_btn primary_btn submitbtn-color']")

        //History_tabs
        this.All = page.locator("//div[contains(text(),'All')]")
        this.OP = page.locator("//div[contains(text(),'OP')]")
        this.IP = page.locator("//div[contains(text(),'IP')]")
        this.Surrender = page.locator("//div[contains(text(),'Surrender')]")
        this.Adoption = page.locator("//div[contains(text(),'Adoption')]")
        this.Shop = page.locator("//div[contains(text(),'Shop')]")

        //Return button and Return Submit Button
        this.return = page.locator("//button[@class='btn reference-btn btn-one btn-secondary']")
        this.return_but = page.locator("//button[@class='btn submitbtn-color submit-height-one btn-primary']")
        this.return_reason = page.locator("//textarea[@id='cancelReason']")

        this.bill = page.locator("//button[@class='btn reference-btn btn-secondary']")
        this.reorder = page.locator("//button[@class='btn reference-btn btn-two btn-secondary']")

        //Confirm Message Box
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");



    }

    async History() {
        await this.history.waitFor({ state: 'visible' });

        await this.history.click()
        await this.page.waitForTimeout(500);
    }

    async All_Tab() {

        await this.All.waitFor({ state: 'visible' })
        await this.All.click();
        await this.loaded.waitFor({ state: 'visible' })

    } async OP_Tab() {

        await this.OP.waitFor({ state: 'visible' })
        await this.OP.click();
        await this.loaded.waitFor({ state: 'visible' })

    } async IP_Tab() {

        await this.IP.waitFor({ state: 'visible' })
        await this.IP.click();
        await this.loaded.waitFor({ state: 'visible' })

    } async Surrender_Tab() {

        await this.Surrender.waitFor({ state: 'visible' })
        await this.Surrender.click();
        await this.loaded.waitFor({ state: 'visible' })

    } async Adoption_Tab() {

        await this.Adoption.waitFor({ state: 'visible' })
        await this.Adoption.click();
        await this.loaded.waitFor({ state: 'visible' })

    } async Shop_Tab() {

        await this.Shop.waitFor({ state: 'visible' })
        await this.Shop.click();
        await this.loaded.waitFor({ state: 'visible' })

    }
    async History_Button() {

        await this.History.waitFor({ state: 'visible' });

        await this.History.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);

    }
    async XIcon() {


        await this.xicon.waitFor({ state: 'visible' });

        await this.xicon.click();
        await this.loaded.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(1000);
    }
    async Download() {
        await this.download.waitFor({ state: 'visible' });

        await this.download.click()
        await this.page.waitForTimeout(500);
    }
    async Clear_Date() {
        await this.dateclear.waitFor({ state: 'visible' });

        await this.dateclear.click()
        await this.page.waitForTimeout(500);
    }
    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        await this.loaded.waitFor({ state: 'visible' });

        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }

    async View_Proforma(cus, pet) {


        const cus_name = cus.toLowerCase()
        const pet_name = pet.toLowerCase()

        //View With Customer ID or Name and Pet ID.
        //  const View = this.page.locator(`//div[@class='ag-row-even ag-row-no-focus ag-row ag-row-level-0 ag-row-position-absolute ag-row-first']//div[@col-id='ownerid' or @col-id="patientname"][normalize-space()='Ej Pradeep']/following-sibling::div[@col-id='petid'][normalize-space()='27259']/following-sibling::div[@col-id='action']/div`)

        //View With Customer ID or Name and Pet ID or Name.
        const view1 = this.page.locator(`//div[(@col-id='ownerid' or @col-id='patientname') and   contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}') ] /following-sibling::div[   (@col-id='petid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}'))   or    (@col-id='petname' and .//b[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]) ] /following-sibling::div[@col-id='action']/div`).first()

        //View With Customer ID or Name
        const view2 = this.page.locator(`//div[(@col-id='ownerid' or @col-id='patientname')    and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}') ]/following-sibling::div[@col-id='action']/div`).first()

        await this.loaded.waitFor({ state: 'visible' })

        if (cus_name !== '' && pet_name !== '') {

            await view1.waitFor({ state: 'visible' })

            await view1.click();

        } else if (cus_name !== '' && pet_name == '') {

            await view2.waitFor({ state: 'visible' })

            await view2.click();

        }
        //wait for loading
        const load = this.page.locator("//div[@id='medicine-table']//div[contains(@name,'center')]")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000)

    }
    async Bill_Button() {
        await this.bill.waitFor({ state: 'visible' });

        await this.bill.click()
        const load = this.page.locator("//div[@class='col-12 col']")
        await load.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(500);
    }
    async Return_Button() {
        await this.return.waitFor({ state: 'visible' });

        await this.return.click()

        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']")
        await load.waitFor({ state: 'visible' })
    }

    async Return_Quan(medi, RQ) {
        const med = medi.toLowerCase();
        const returnQ1 = this.page.locator(`//div[@col-id="medicine" and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]//following-sibling::div[@col-id="quantityupdate"]`)
        await returnQ1.waitFor({ state: 'visible' });

        await returnQ1.click()

        await this.page.waitForTimeout(500);

        const returnQ2 = this.page.locator(`//div[@col-id="medicine" and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'para')]//following-sibling::div[@col-id="quantityupdate"]/div/input`)


        await returnQ2.fill(`${RQ}`, { force: true });
        await returnQ2.press(`Enter`, { force: true });

        await this.page.waitForTimeout(500);
    }
    async Return_Submit_Yes() {

        await this.return_but.click()

        await this.ConfirmYes()

        await this.page.waitForTimeout(500);
    }
    async Return_Submit_No() {
        await this.page.waitForTimeout(1000);

        await this.return_but.click()

        await this.ConfirmNo()


        await this.page.waitForTimeout(500);
    }


    async Reorder_Button() {
        await this.reorder.waitFor({ state: 'visible' });

        await this.reorder.click()
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']")
        await load.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(500);
    }
    async ConfirmYes() {
        await this.confirmYes.click();
        await this.page.waitForTimeout(2000);
    }
    async ConfirmNo() {
        await this.confirmNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CancelIcon() {

        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
    }
}