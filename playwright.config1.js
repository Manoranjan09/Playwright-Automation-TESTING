// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', // .test refer to the test files for specific file to run just add ./tests/file_name
  retries: 1, // re-run the Failed test case one time , this is dynamic we can increase this like 1 to 2 or 10

  timeout : 30*1000 , // 30 seconds for global timeout 
  expect : {
    timeout : 5000 , // 5 seconds for expect timeout 

  },
  reporter :'html', 
  
  projects : [
    { 
    name : 'safari',
    use: {
     browserName : 'webkit',
     headless : false ,
     screenshot:'on',
     trace:'on', // ON/OFF
     ...devices['iPhone 13'],
  }
},
{
   name :'chrome',
   use : {
     browserName : 'chromium',
     headless : false ,
     screenshot:'on',
     video:'retain-on-failure', 
     ignoreHTTPSErrors:true,
     trace:'on', // ON/OFF
     //viewport:{width:1280 , height:720},
    //  ...devices[''],
    }
}
  ]
});


