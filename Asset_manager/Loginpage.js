
class Homepage {

  constructor(page) {

    this.page = page;
    this.Username = "//input[@name='phone']";
    this.password = "//input[@name='password']";
    this.Loginbutton = page.locator("(//span[contains(text(),'Login')])[1]");
    this.click = page.locator("//label[text()='Mobile Number/Email']");

  }


  async Launchpage(url) {

    
    await this.page.goto(url)


    // await this.page.waitForTimeout(1000); 
    // await this.Username.click();
    // await this.page.waitForTimeout(1000);
    // await this.page.keyboard.press('F11');





  }
  async Signin(Username, PassWord) {

    await this.page.fill(this.Username, Username);
    await this.page.fill(this.password, PassWord);
    await this.page.waitForTimeout(1000);
    await this.Loginbutton.click();
    await this.page.waitForTimeout(2000);


    console.log("Succesfully logged in");



  }



}

module.exports = { Homepage }