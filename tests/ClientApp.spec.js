const { test, expect } = require('@playwright/test');
 
 
 
 
test('Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "kashyapking507@gmail.com";
   const productName = 'ZARA COAT 3';

   const products = page.locator(".card-body");
    
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").type("Mano123@");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

   const count = await products.count();
   for(let i=0;i<count;++i){
     if (await products.nth(i).locator("b").textContent() === productName)
     {
       // Add to cart
       await products.nth(i).locator("text = Add To Cart").click();
       break;
     }
   }
   await page.locator("[routerlink*=cart]").click();
   await page.locator("div li").first().waitFor();
   const bool = await  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   // checkout button
   await page.locator("text=checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind") // type letters one by one  
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for(let i=0;i<optionsCount;++i)
   {
       const text = await dropdown.locator("button").nth(i).textContent();
       if(text === " India"){
         await dropdown.locator("button").nth(i).click();
         break;
       }
   }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   // Place order 
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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
