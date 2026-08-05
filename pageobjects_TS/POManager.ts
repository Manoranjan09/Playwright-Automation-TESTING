import { CartPage } from './CartPage';
import { DashboardPage } from './DashboardPage';
import { loginpage } from './loginpage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { Page } from '@playwright/test';

 //const { loginpage } = require("./loginpage");
export {loginpage} from './loginpage';
export {DashboardPage} from './DashboardPage';
//const { DashboardPage } = require("./DashboardPage");
export { CartPage} from  './CartPage';
export  { OrdersReviewPage } from './OrdersReviewPage';
export { OrdersHistoryPage } from './OrdersHistoryPage';

export class POManager {
     loginPage : loginpage;
     dashboardPage : DashboardPage;
     cartPage :CartPage;
     ordersReviewPage : OrdersReviewPage;
     ordersHistoryPage :OrdersHistoryPage;
     page : Page;
    constructor(page:any) {
        this.page = page;

        this.loginPage = new loginpage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardpage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
}
