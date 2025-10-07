exports.Prof_History = class Prof_History {

    constructor(page) {
        this.page = page;
        this.proforma = page.locator("//a[normalize-space()='Proforma']")
    }
}