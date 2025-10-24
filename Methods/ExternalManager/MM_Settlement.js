exports.Settlement = class Settlement {

    constructor(page) {
        this.page = page

        //Select Asset Module(AssetAllocation)
        this.hoverAction1 = page.locator("//div[text()='Marketplace Management']");
        this.tabAction = page.locator("//div[text()='Marketplace Management']")

        //Tab
        this.all = page.locator("//div[@role='tab']//span[contains(text(),'All')]")
        this.pending = page.locator("//div[@role='tab']//span[contains(text(),'Pending')]")
        this.settled = page.locator("//div[@role='tab']//span[contains(text(),'Settled')]")
        
        //Settle button.
        this.setbutton = page.locator("//button[@class='btn primary-btn submit-btn-size mr-2 btn-secondary']/*[contains(text(),'Settle')]")
        
        //Search and Download
        this.search = page.locator("//input[@placeholder='Search']")
        this.download = page.locator("//button[@class='btn mr-2 btn-primary']")

        //filter
        this.filter=page.locator("//button[contains(text(),'Filter')]")
        
        //Allcheckbox
        this.checkboxall = page.locator(`//span[normalize-space()='Seller ID']/../../../../preceding-sibling::div/div/div/following-sibling::div/input`)

    }
    async Select_Module() {
        await this.page.waitForTimeout(2000);
        //Tab Action
        await this.hoverAction1.hover();
        await this.hoverAction1.click();
        await this.page.waitForTimeout(2000);
        for (var i = 0; i <= 3; i++) {
            await this.tabAction.press('Tab');;
        }
        await this.tabAction.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.download.hover();
        await this.page.waitForTimeout(1000);
    }

   async AllTab() {
        await this.all.waitFor({ state: 'visible' });
        await this.all.click();
        await this.page.waitForTimeout(1000);

    }
    async PendingTab() {
        await this.pending.waitFor({ state: 'visible' });
        await this.pending.click();
        await this.page.waitForTimeout(1000);

    } async SettledTab() {
        await this.settled.waitFor({ state: 'visible' });
        await this.settled.click();
        await this.page.waitForTimeout(1000);

    }
    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        const load = "//div[@class='ag-body-viewport ag-layout-normal ag-row-no-animation']"
        await this.page.locator(load).waitFor({ state: 'visible' });
        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }  
      async Filter(sfilter) {
      
        await this.filter.waitFor({ state: 'visible' });
        await this.filter.click()
        const sfil=sfilter.toLowerCase();

        const filt= this.page.locator(`//input[@type="checkbox"]/../label[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sfil}')]`)
        await filt.click();
        await this.page.waitForTimeout(1000);

    }

    async Checkbox(Id, name, product, amount) {
        const sid = Id.toLowerCase()
        const sname = name.toLowerCase()
        const sproduct = product.toLowerCase()
        const samount = amount.toLowerCase()

        //Select by Amount, ProductName and SellerName 
        const checkbox1 = this.page.locator(`//div[@col-id="amount" and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${samount}')]/preceding-sibling::div[@col-id='productname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sproduct}')]/preceding-sibling::div[@col-id='sellername' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sname}')]/preceding-sibling::div[@col-id='0']/div/div/div/child::div/input`)
        //Select by Amount, ProductName and SellerID 
        const checkbox2 = this.page.locator(`//div[@col-id="amount" and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${samount}')]/preceding-sibling::div[@col-id='productname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sproduct}')]/preceding-sibling::div[@col-id='id' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sid}')]/preceding-sibling::div[@col-id='0']/div/div/div/child::div/input`)
        //Select by ProductName and SellerName 
        const checkbox3 = this.page.locator(`//div[@col-id='productname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sproduct}')]/preceding-sibling::div[@col-id='sellername' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sname}')]/preceding-sibling::div[@col-id='0']/div/div/div/child::div/input`)
        //Select by ProductName and SellerID
        const checkbox4 = this.page.locator(`//div[@col-id='productname' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sproduct}')]/preceding-sibling::div[@col-id='id' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${sid}')]/preceding-sibling::div[@col-id='0']/div/div/div/child::div/input`)

        if (samount !== '' && sproduct !== '' && sname !== '') {

            await checkbox1.waitFor({ state: 'visible' })

            await checkbox1.click({force:true});

        } else if (samount !== '' && sproduct !== '' && sid !== '') {

            await checkbox2.waitFor({ state: 'visible' })

            await checkbox2.click({force:true});

        } else if (sproduct !== '' && sname !== '') {

            await checkbox3.waitFor({ state: 'visible' })

            await checkbox3.click({force:true});

        } else if (sproduct !== '' && sid !== '') {

            await checkbox4.waitFor({ state: 'visible' })

            await checkbox4.click({force:true});
        }

        await this.page.waitForTimeout(1000);
    }
    async AllCheckbox() {

        await this.checkboxall.waitFor({ state: 'visible' });
        await this.checkboxall.click({ force: true });
        await this.page.waitForTimeout(2000);
    }
    async Settle_Button() {

        await this.setbutton.waitFor({ state: 'visible' });
        await this.setbutton.click();
        await this.page.waitForTimeout(2000);
    }






















}