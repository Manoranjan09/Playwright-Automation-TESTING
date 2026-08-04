const {test , expect , request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail: "kashyapking507@gmail.com" , userPassword: "Mano123@"};
const orderPayload = {orders:[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders = {count:2,message:"Cart Data Found"};

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

   await page.route("**/api/ecom/order/get-orders-for-customer/*" ,
   async route =>
    {
        //intercepting response -> API response->{playwright fake response}->browser -> render data on frontend
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        await route.fulfill(
            {
                response,
                body, 
            }
        )
    }
   );

   
   // select order id  order 
   const responsePromise = page.waitForResponse(
  "**/api/ecom/order/get-orders-for-customer/*"
);

await page.locator("button[routerlink*='myorders']").click();

await responsePromise;

   console.log(await page.locator(".mt-4").textContent());
   
})