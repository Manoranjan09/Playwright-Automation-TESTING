const {test} = require('@playwright/test');
const {expect} = require('@playwright/test')

test('Test UI controls ',async ({page})=>
{


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page.locator('#username');
const signIn = page.locator("#signInBtn");
const dropdown = page.locator("select.form-control");
const documentLink = page.locator("[href*='documents-request']");


await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
//assertion
console.log(await page.locator(".radiotextsty").last().isChecked()); // is is checked o/p will be true otherwise false 
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLink).toHaveAttribute("class" ,"blinkingText");

});

// SECOND ONE IS THIS 
test('page context  playwright test ',async ({browser})=>
{

// Playwright code    
// chrome plugin/cookies
const context = await browser.newContext();
const page = await context.newPage();  //--> we can pass simply page as a parameter

// we can Block .css using this line so that the page load instantly
//await page.route('**/*.css' , route => route.abort());

// we cna block the image too 
//await page.route('**/*.{jpg ,png,jpeg}', route => route.abort());

const userName = page.locator('#username');
const signIn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");

page.on('request' ,request=>console.log(request.url()));
page.on('response' ,response=>console.log(response.url(), response.status()));

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title()); 

// css 
await userName.type("rahulshettyacademy");
await page.locator('#password').fill("Learning@830$3mK2");
await signIn.click();
//console.log(await page.locator("[style*='block']").textContent());
//await expect(page.locator("[style*='block']")).toContainText("Correct");

//type --fill
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
await cardTitles.first().waitFor();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent()); // second one

const allTitles = await cardTitles.allTextContents();
console.log(allTitles);


});

test('Child windows hadl' , async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']"); 
 
    // These are the asynchronous steps 
    const [newPage] = await  Promise.all(
    [
    context.waitForEvent('page'), // listen for any new page (pending , rejected & ful filled)
    documentLink.click(), // new page is opened
    ])

      const text = await  newPage.locator(".red").textContent();
      const arrayText = text.split("@");
      const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").type(domain);
    
    console.log(await page.locator("#username").inputValue());

     
});