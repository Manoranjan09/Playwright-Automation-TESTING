class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*=cart]");
        this.orders = page.locator("button[routerlink*='myorders']"); // NEW
    }

    async searchProductAddcart(productName) {

    await this.productsText.first().waitFor();

    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {

        if (await this.products.nth(i).locator("b").textContent() === productName) {

            await this.products.nth(i)
                .locator("text=Add To Cart")
                .click();

            // Wait until spinner disappears
            await this.page.locator(".ng-animating").last().waitFor({
                state: "hidden"
            });

            break;
        }
    }
}

    async navigatTocart() {
        await this.cart.click();
    }

    // NEW METHOD
    async navigateToOrders() {
         await this.orders.click();
    }
}

module.exports = { DashboardPage };