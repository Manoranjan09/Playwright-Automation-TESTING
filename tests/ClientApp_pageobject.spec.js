const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
// JSON --> String --> JS Object
const dataSet = JSON.parse(
    JSON.stringify(require('../utils/TestData.json'))
);

for (const data of dataSet) {

    test(`Web Client App login - ${data.email}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validlogin(data.email, data.password);

        const dashboardPage = poManager.getDashBoardpage();
        await dashboardPage.searchProductAddcart(data.productName);
        await dashboardPage.navigatTocart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);

        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });



customtest(`@Web Client App login - ${data.email}`, async ({ page, testDataForOrder }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validlogin(testDataForOrder.email, testDataForOrder.password);

        const dashboardPage = poManager.getDashBoardpage();
        await dashboardPage.searchProductAddcart(testDataForOrder.productName);
        await dashboardPage.navigatTocart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
        await cartPage.Checkout();

        });
 
}