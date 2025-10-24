exports.Noti_lang = class Profile {
    constructor(page) {
        this.page = page;
        this.lang = page.locator("//*[name()='path' and contains(@d,'M0 8a8 8 0')]")
        //notification
        this.noticlick = page.locator("//i[@class='v-icon notranslate mdi-light mr-2 v-icon mdi mdi-bell-outline theme--light']")
        this.allnoti = page.locator("//body/div[@id='app']/div/div[@id='main-wrapper']/span/div[@id='Dash-Header']/nav[@id='navbar']/div[@id='nav_collapse']/ul[@id='user']/div[contains(@class,'b-sidebar-outer notificationSidebar')]/div[@id='sidebar-right']/div[contains(@class,'b-sidebar-body')]/div[contains(@class,'notification-status-div')]/div/span/span[contains(normalize-space(),'All')]")
        this.unreadnoti = page.locator("//body/div[@id='app']/div/div[@id='main-wrapper']/span/div[@id='Dash-Header']/nav[@id='navbar']/div[@id='nav_collapse']/ul[@id='user']/div[contains(@class,'b-sidebar-outer notificationSidebar')]/div[@id='sidebar-right']/div[contains(@class,'b-sidebar-body')]/div[contains(@class,'notification-status-div')]/div/span/span[contains(normalize-space(),'Unread')]")
        this.readnoti = page.locator("//body/div[@id='app']/div/div[@id='main-wrapper']/span/div[@id='Dash-Header']/nav[@id='navbar']/div[@id='nav_collapse']/ul[@id='user']/div[contains(@class,'b-sidebar-outer notificationSidebar')]/div[@id='sidebar-right']/div[contains(@class,'b-sidebar-body')]/div[contains(@class,'notification-status-div')]/div/span/span[contains(normalize-space(),'Read')]")

        this.cancelIcon = page.locator("//div[@id='sidebar-right']//button[@aria-label='Close']//*[name()='svg']");

    }

    async Language(ChooseLang) {
        await this.lang.waitFor({ state: 'visible' });
        await this.lang.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//a[contains(normalize-space(),'${ChooseLang}')]`).click()
        await this.page.waitForTimeout(1000);

    }
    async Notifications() {
        await this.noticlick.waitFor({ state: 'visible' });
        await this.noticlick.click();
        await this.page.waitForTimeout(1000);


    }
    async AllNotification() {
        await this.allnoti.waitFor({ state: 'visible' });
        await this.allnoti.click();
       
        const load = "//div[contains(@class,'px-2 py-2 notification-content')]"
        await this.page.waitForSelector(load, {
            state: 'visible', // default; waits until element is visible
            timeout: 5000     // optional: timeout in ms (default is 30s)
        });
        await this.page.waitForTimeout(500);


    } async UnreadNotification() {
        await this.unreadnoti.waitFor({ state: 'visible' });
        await this.unreadnoti.click();
        const load = "//div[contains(@class,'px-2 py-2 notification-content')]"
        await this.page.waitForSelector(load, {
            state: 'visible', // default; waits until element is visible
            timeout: 5000     // optional: timeout in ms (default is 30s)
        });
        await this.page.waitForTimeout(500);


    } async ReadNotification() {
        await this.readnoti.waitFor({ state: 'visible' });
        await this.readnoti.click();
        const load = "//div[contains(@class,'px-2 py-2 notification-content')]"
        await this.page.waitForSelector(load, {
            state: 'visible', // default; waits until element is visible
            timeout: 5000     // optional: timeout in ms (default is 30s)
        });
        await this.page.waitForTimeout(500);
    }
    async CancelIcon() {
       
        await this.cancelIcon.waitFor({ state: 'visible' });

        await this.cancelIcon.click();

    }
}