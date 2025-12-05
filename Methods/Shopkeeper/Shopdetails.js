exports.Shopdetails = class Shopdetails {

    constructor(page) {
        this.page = page;

    }

    async Select_Shop(shop) {
        const sh = shop.toUpperCase()
        const Shopname = this.page.locator(`//b[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'testshop')]/../parent::div`)
       // await this.page.pause();
      
        await Shopname.waitFor({ state: 'visible' })

        await Shopname.hover();

        await Shopname.click();
        await this.page.waitForTimeout(1000)



    }
}