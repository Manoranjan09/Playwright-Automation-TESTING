// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', // .test refer to the test files for specific file to run just add ./tests/file_name
  

  timeout : 30*1000 , // 30 seconds for global timeout 
  expect : {
    timeout : 5000 , // 5 seconds for expect timeout 

  },
  reporter :'html', 
  use : {
     actionTimeout: 10 * 1000,
     navigationTimeout: 30 * 1000,
     browserName : 'chromium',
     headless : false ,
     screenshot:'on',
     trace:'on', // ON/OFF
  }
});


