class loginpage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validlogin(username, password) {
        await this.username.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle'); 
    }
}

module.exports = { loginpage };