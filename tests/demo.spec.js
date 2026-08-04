const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

const dataset = JSON.parse(
    JSON.stringify(require('./utils/data.json'))
);

test.beforeAll(async () => {
    console.log("I am the first");
});

for (const data of dataset) {

    test(`Testing with ${data.email}`, async ({ page }) => {

        const poManager = new POManager(page);

        // Login Page
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validlogin(data.email, data.password);

        // Dashboard Page
        const dashboardPage = poManager.getDashBoardpage();
        await dashboardPage.searchProductAddcart(data.productName);
        await dashboardPage.navigatTocart();

        // Cart Page
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

    });

}