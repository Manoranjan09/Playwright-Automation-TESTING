const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.only('Web Client App login', async ({ page }) => {

    const poManager = new POManager(page);

    const username = "kashyapking507@gmail.com";
    const password = "Mano123@";
    const productName = "ZARA COAT 3";

    // Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validlogin(username, password);

    // Dashboard Page
    const dashboardPage = poManager.getDashBoardpage();
    await dashboardPage.searchProductAddcart(productName);
    await dashboardPage.navigatTocart();

    // Cart Page
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    // Orders Review Page
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    // Orders History Page
    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});