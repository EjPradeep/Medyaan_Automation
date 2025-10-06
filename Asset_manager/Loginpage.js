
class Homepage {

  constructor(page) {

    this.page = page;
    this.Username = page.locator("//input[@name='phone']");
    this.password = page.locator("//input[@name='password']");
    this.Loginbutton = page.locator("(//span[contains(text(),'Login')])[1]");
    this.click = page.locator("//label[text()='Mobile Number/Email']");

  }


  async Launchpage(url) {


    await this.page.goto(url)
    await this.page.waitForTimeout(1000);

  }
  async Signin(Username, PassWord) {
    await this.Username.waitFor({ state: 'visible' });

    await this.Username.fill(Username);

    await this.password.fill(PassWord);

    await this.page.waitForTimeout(1000);

    await this.Loginbutton.click();
    await this.page.waitForTimeout(2000);


    console.log("Succesfully logged in");



  }



}

module.exports = { Homepage }