exports.Changepass = class Changepass {
    constructor(page) {
        this.page = page;

        // Locators for profile and password change
        this.profileDropdown = page.locator("//div[@class='nav-height']");
        this.changePasswordLink = page.locator(`//ul[@class="dropdown-menu dropdown-menu-right show"]/li/a[contains(text(),'Change Password')]`);
        this.currentPassword = page.locator("//label[normalize-space()='Current Password']");
        this.newPassword = page.locator("//label[normalize-space()='New Password']");
        this.confirmPassword = page.locator("//label[normalize-space()='Confirm Password']");
        this.proceedButton = page.locator("//button[@class='btn primary-btn submit-btn-size btn-secondary']");
        //Confirm Message
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        this.back = page.locator("//button[@class='btn secondary-btn back-btn-size mt-4 btn-secondary']")



    }

    async NavToChangePassword() {

        // Click profile dropdown
        await this.profileDropdown.click();
        await this.page.waitForTimeout(1000);

        // Click change password option
        await this.changePasswordLink.click();
        await this.page.waitForTimeout(1000);

        console.log('Successfully navigated to change password screen');

    }
    async Backbutton() {
        await this.back.click();
        await this.page.waitForTimeout(1000)
    }
   async ProceedButton() {
        await this.proceedButton.click();
        await this.page.waitForTimeout(1000)
    }
   


    async ChangePassword(currentPass, newPass, confirmPass) {

        // Fill password fields
        await this.currentPassword.fill(currentPass);
        await this.newPassword.fill(newPass);
        await this.confirmPassword.fill(confirmPass);

      

    }


}