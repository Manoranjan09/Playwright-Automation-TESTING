const { When, Then, Given} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');


Given('a login to Ecommerce  application with {string} and {string}', {timeout : 100*1000} , async function (email, password) {
  // Write code here that turns the phrase above into concrete actions
  const browser = await chromium.launch({headless : false });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.poManager = new POManager(page);
        
        const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validlogin(email,password);
});

When('Add {string} to cart', async  function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashBoardpage();
        await this.dashboardPage.searchProductAddcart(productName);
        await this.dashboardPage.navigatTocart();
});

Then('verify {string} is displayed in the cart', async  function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

       this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
       console.log(this.orderId);
});

Then('verify order is present in the order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();

        const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(this.orderId);

expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});  