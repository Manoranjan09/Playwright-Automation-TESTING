const {test , expect , request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail: "kashyapking507@gmail.com" , userPassword: "Mano123@"};
const orderPayload = {orders:[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async() =>
{
    
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  

    

});
test.beforeEach( () =>
{
    
})





test('Place the order avoid login', async ({ page }) => {

    

await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
}, response.token);
  
   await page.goto("https://rahulshettyacademy.com/client/");

   

   // select order id  order 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for(let i =0;i<await rows.count();++i)
   {
    const rowOrderId =  await rows.nth(i).locator("th").textContent();
    if(response.orderId.includes(rowOrderId))
    {
       await rows.nth(i).locator("button").first().click();
       break;
    }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   //await page.pause();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
   
})