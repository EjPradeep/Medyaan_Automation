exports.Dashboard = class Dashboard {

    constructor(page) {
        this.page = page;

        this.Op = page.locator("//div[@class='v-slide-group__wrapper']/div/div/following-sibling::div[contains(normalize-space(.), 'OP')]")
        this.Ip = page.locator("//div[@class='v-slide-group__wrapper']/div/div/following-sibling::div[contains(normalize-space(.), 'IP')]")
        this.paymentpending = page.locator("//div[@class='v-slide-group__wrapper']/div/div/following-sibling::div[contains(normalize-space(.), 'Payment Pending')]")
        this.deliverypending = page.locator("//div[@class='v-slide-group__wrapper']/div/div/following-sibling::div[contains(normalize-space(.), 'Delivery Pending')]")

        //for Page Load Purpose
        this.loaded = this.page.locator("//div[@class='v-window__container']//div//div//div//div[@role='grid']")

        //search
        this.search = page.locator("//input[@id='patientquickFilter' or @id='pharmacyhistoryFilter']")
       
        //Invoice Headbuttons
        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")
        this.dashbord = page.locator("//div[contains(@class,'options-div')]//button[@class='btn close-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='home']")
        this.logout = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='sign-out-alt']")

        //Create-Invoice
        this.cinvoice = page.locator("//button[@class='btn primary-btn large-btn-size btn-secondary' or @class='btn primary-btn large-btn-size btn-primary'][contains(text(),'Create')]")
        this.searchmat = page.locator("//div[@class='mt-1 med-grid']//div//div//input[@id='searchInput']")
        this.batch = page.locator("//select[@id='batchId']");
        this.quantity = page.locator("//input[@id='quantity']");
        this.add = page.locator("//div[@class='text-start']//button[@type='button']");
        this.clear_searchmat = page.locator("//div[@class='mt-1 med-grid']//div//div//div[@id='common-search']//div[@class='search-input-grid']//div//div//img[@title='Clear']")

        //Discount 
        this.discount = page.locator(`//div[contains(@class,'card apply-coupen-card percent-color')]//div[contains(@class,'card-body')]`);
        this.xicon = page.locator("//div[contains(@class,'b-sidebar-outer')]/div/following-sibling::div/header[@class='b-sidebar-header']//button[@aria-label='Close']//*[name()='svg']");
        this.remove_coup = page.locator("//div[@class='remove-pointer']");
        this.EmpID = page.locator("//div[contains(@class,'mb-2')]//div//div//input[contains(@type,'text')]");


        //Confirm Message Box
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //BackArrow
        this.backarrow = page.locator("//div[@class='col']//*[@data-icon='arrow-left']");

        //Delivery_Button
        this.del_button = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']")

    }

    async OP_Tab() {

        await this.Op.waitFor({ state: 'visible' })
        await this.Op.click();
        await this.loaded.waitFor({ state: 'visible' })

    }
    async IP_Tab() {

        await this.Ip.waitFor({ state: 'visible' })
        await this.Ip.click();
        await this.loaded.waitFor({ state: 'visible' })

    }
    async Payment_Pending_Tab() {

        await this.paymentpending.waitFor({ state: 'visible' })
        await this.paymentpending.click();
        await this.loaded.waitFor({ state: 'visible' })

    }

    async Delivery_Pending_Tab() {

        await this.deliverypending.waitFor({ state: 'visible' })
        await this.deliverypending.click();
        await this.loaded.waitFor({ state: 'visible' })

    }

    async View_Appointment(cus, pet, num) {

        const cus_name = cus.toLowerCase()
        const pet_name = pet.toLowerCase()
        const cus_num = num.toLowerCase()

        //view locator with Customer name, Pet name & Customer number
        const view1 = this.page.locator(`//div[@col-id='patientname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary']`)

        //view locator with Pet name & Customer number
        const view2 = this.page.locator(`//div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary']`)

        //view locator with Customer name & Pet name 

        const view3 = this.page.locator(`//div[@col-id='patientname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary' or @class='btn view-btn btn-secondary']`)

        //View locator for Payment Pending Tab
        const view4 = this.page.locator(`//div[@col-id='patientname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary' or @class='btn view-btn btn-secondary']`).first();

        await this.loaded.waitFor({ state: 'visible' })


        if (cus_name !== '' && pet_name !== '' && cus_num !== '') {

            await view1.waitFor({ state: 'visible' })

            await view1.click();

        } else if (cus_name == '' && pet_name !== '' && cus_num !== '') {

            await view2.waitFor({ state: 'visible' })

            await view2.click();


        } else if (cus_name !== '' && pet_name !== '' && cus_num == '') {

            await view3.waitFor({ state: 'visible' })

            await view3.click();
        }
        else {
            await view4.waitFor({ state: 'visible' })
            await view4.click();
            await this.page.waitForTimeout(1000)
        }
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']").first()
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000)
    }

    async Invoice_Button(cus, pet, num) {

        const cus_name = cus.toLowerCase()
        const pet_name = pet.toLowerCase()
        const cus_num = num.toLowerCase()

        //view locator with Customer name, Pet name & Customer number
        const Cinvoice_button1 = this.page.locator(`//div[@col-id='patientname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn active-btn btn-secondary']`)

        //view locator with Pet name & Customer number
        const Cinvoice_button2 = this.page.locator(`//div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn active-btn btn-secondary']`)

        //view locator with Customer name, Pet name & Customer number

        const Cinvoice_button3 = this.page.locator(`//div[@col-id='patientname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='petname' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pet_name}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn active-btn btn-secondary']`)

        await this.loaded.waitFor({ state: 'visible' })

        if (cus_name !== '' && pet_name !== '' && cus_num !== '') {

            await Cinvoice_button1.waitFor({ state: 'visible' })

            await Cinvoice_button1.click();

        } else if (cus_name == '' && pet_name !== '' && cus_num !== '') {

            await Cinvoice_button2.waitFor({ state: 'visible' })

            await Cinvoice_button2.click();


        } else if (cus_name !== '' && pet_name !== '' && cus_num == '') {

            await Cinvoice_button3.waitFor({ state: 'visible' })

            await Cinvoice_button3.click();
        }
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000)
    }

    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        const load = "//div[@class='v-window__container']//div//div//div//div[@role='grid']"

        await this.page.locator(load).waitFor({ state: 'visible' });
        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }

    async CreateInvoice_Button() {
        await this.cinvoice.waitFor({ state: 'visible' });

        await this.cinvoice.click()
        await this.page.waitForTimeout(500);
    }

    async Search_Material(material) {

        await this.searchmat.fill(material);
        const mat = material.toLowerCase();
        const locator = this.page.locator(`//b[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${mat}')]`);
        await locator.waitFor({ state: 'visible' });

        await locator.click();

        await this.page.waitForTimeout(500);
    }
    async Clear_Search() {
        await this.clear_searchmat.waitFor({ state: 'visible' });

        await this.clear_searchmat.click();

        await this.page.waitForTimeout(500);
    }
    async Batch(batch) {
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(500);
    }
    async Quantity(quantity) {
        await this.quantity.fill(quantity);
        await this.page.waitForTimeout(500);
    }
    async Add_button() {
        await this.add.click();
        await this.page.waitForTimeout(1000);
    }

    async Edit_Material(edit) {
        const edit_mat = this.page.locator(`//div[@col-id='medicine' and normalize-space()='${edit}']/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)

        await edit_mat.waitFor({ state: 'visible' });

        await edit_mat.click(Edit);
        await this.page.waitForTimeout(1000);
    }
    async Delete_Material(dele) {
       
        const dele_mat = dele.toLowerCase()
        const delete_mat = this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${dele_mat}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn delete-btn btn-secondary"]`)

        await delete_mat.waitFor({ state: 'visible' });
        await delete_mat.click();
        await this.page.waitForTimeout(1000);
    }
    async Tick_Material(tick) {
        var tick_mat = this.page.locator(`//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']/*/div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${tick}')]/following-sibling::div[@col-id='action']/div/div/input`)

        await tick_mat.click(tick);
        await this.page.waitForTimeout(1000);

    }
    async Untick_Material(tick) {

        await this.Tick_Material(tick)
    }

    async ClickDiscount() {

        await this.discount.click();
    }

    async ApplyDiscount(coup) {

        const coup1 = coup.toLowerCase();

        let coupon = this.page.locator(`//div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${coup1}')]/following-sibling::div[@class='discount-pointer percent-pointer']`);


        await this.ClickDiscount();
        await coupon.waitFor({ state: 'visible' });

        await coupon.click();

        await this.page.waitForTimeout(1000);
    }
    async XIcon() {


        await this.xicon.waitFor({ state: 'visible' });

        await this.xicon.click();
        await this.page.waitForTimeout(1000);
    }
    async RemoveDiscount() {

        await this.remove_coup.waitFor({ state: 'visible' });

        await this.remove_coup.click();
        await this.page.waitForTimeout(1000);
    }
    async EmployeeID(empid) {

        await this.EmpID.waitFor({ state: 'visible' });

        await this.EmpID.fill(empid);
        await this.page.waitForTimeout(1000);
    }

    //Go to History page.
    async History_Button() {

        await this.history.waitFor({ state: 'visible' });

        await this.history.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);

    }
    //Get back to Home page.
    async Dashboard_Button() {

        await this.dashbord.waitFor({ state: 'visible' });

        await this.dashbord.click();
        await this.page.waitForTimeout(1000);
    }
    //Get Logout.
    async Logout_Button() {

        await this.logout.waitFor({ state: 'visible' });

        await this.logout.click();
        await this.page.waitForTimeout(1000);
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
    async BackArrow() {

        await this.backarrow.waitFor({ state: 'visible' });

        await this.backarrow.click();
        await this.page.waitForTimeout(1000);
    }
    async Delivery_Button_Yes() {

        await this.del_button.waitFor({ state: 'visible' });

        await this.del_button.click();
        await this.ConfirmYes();
        await this.page.waitForTimeout(1000);
    }
    async Delivery_Button_No() {

        await this.del_button.waitFor({ state: 'visible' });

        await this.del_button.click();
        await this.ConfirmNo();

        await this.page.waitForTimeout(1000);
    }
}