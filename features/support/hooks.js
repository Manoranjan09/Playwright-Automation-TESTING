const { chromium } = require("playwright");
const { POManager } = require("../../pageobjects/POManager");
const { Before, After, BeforeStep, AfterStep ,Status } = require("@cucumber/cucumber");

Before({tags: "@Regression"},async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {

});

AfterStep(async function ({result}) {
   if (result.status === Status.FAILED) {
        await this.page.screenshot({path : 'screenshot1.png'});
  }

});

After(async function () {
  console.log("I am last to execute");
  
});
