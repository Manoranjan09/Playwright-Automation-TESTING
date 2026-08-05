
import { test, expect } from '@playwright/test';
import {customtest} from '../utils_TS/test-base';
import { POManager } from '../pageobjects_TS/POManager';
import { APIUtils } from '../utils_TS/APIUtils';
//import dataSet from "../utils_TS/TestData.json";

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
        
        let orderId : any;

        orderId = await ordersReviewPage.SubmitAndGetOrderId();

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);

        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });



customtest.only(`@Web Client App login - ${data.email}`, async ({ page, testDataForOrder }) => {

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