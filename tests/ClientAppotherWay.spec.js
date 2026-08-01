const { test, expect } = require('@playwright/test');
 
 
 
 
test('Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "kashyapking507@gmail.com";
   const productName = 'ZARA COAT 3';

   const products = page.locator(".card-body");
    
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.getByPlaceholder("Enter your Passsword").type("Mano123@");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button" ,{name :"Add To Cart"}).click();
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

   
   await page.locator("div li").first().waitFor();
   
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   // checkout button
   await page.getByRole("button" ,{name: "checkout"}).click();
   await page.getByPlaceholder("select Country").pressSequentially("ind") // type letters one by one  
   
   await page.getByRole("button" ,{name: "India"}).nth(1).click();
   

   // Place order 
   await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted ").textContent();

   console.log(orderId); // print order id 

   // select order id  order 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for(let i =0;i<await rows.count();++i)
   {
    const rowOrderId =  await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId))
    {
       await rows.nth(i).locator("button").first().click();
       break;
    }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   
})
