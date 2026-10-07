import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:'./tests/e2e',
  fullyParallel:false,
  workers:1,
  timeout:30000,
  use:{
    baseURL:'http://127.0.0.1:4173',
    viewport:{width:1366,height:900},
    reducedMotion:'reduce',
    launchOptions:process.env.E2E_CHROMIUM_PATH?{executablePath:process.env.E2E_CHROMIUM_PATH,args:['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--no-zygote','--disable-gpu']}:undefined,
    trace:'retain-on-failure',
  },
  webServer:{command:'npm run preview',url:'http://127.0.0.1:4173',reuseExistingServer:false,timeout:20000},
  reporter:[['list']],
});
