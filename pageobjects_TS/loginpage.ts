import { Locator , Page} from "@playwright/test";

export class loginpage {
signInbutton : Locator;
username : Locator;
password : Locator;
page : Page;

    constructor(page : Page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validlogin(username : string, password : string) {
        await this.username.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle'); 
    }
}

