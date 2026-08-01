const { test, expect } = require("@playwright/test");

test('@Security test request intercept ', async ({ page }) => {
  const email = "kashyapking507@gmail.com";
  const productName = "ZARA COAT 3";

  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type("Mano123@");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6b6abc1c85b8849b49220565",
        
      }),
      
  );
  
  await page.locator("button:has-text('view')").first().click();
  await expect (page.locator("page").last()).toHaveText("You are not authorized to view this order");
  
  
});
