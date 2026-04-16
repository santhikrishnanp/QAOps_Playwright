// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /* Run tests in files in parallel */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout:40*1000,
  expect:{
    timeout:40*1000,
  },
  reporter:'html',
  use: {
   browserName:'chromium'
   
  }
    
});
module.exports = config


