import { test, expect } from '@playwright/test';

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 10_000});
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


});

// 30 seconds is the global time given to run this -- this is called Test Timeout 
test('Playwright Test Level timeout ', async ({ page }) => {
    
    test.setTimeout(60000);
    // Global Timeout override
    const slowExpect = expect.configure({timeout:9000});
    page.setDefaultTimeout(9000);
    // Navigation Timeout (.goto)
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    // Global --> Test --> step
    await page.getByRole("link",{name : "Shop"}).click({timeout:15000});
    //locator(css)
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();




});