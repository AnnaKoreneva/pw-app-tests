import { defineConfig, devices } from '@playwright/test';
import path from 'node:path/win32';

require('dotenv').config();

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,

  reporter: [
    ["list"],
    ["json", { outputFile: "json-report/json-report.json" }],
    [
      "allure-playwright",
      {
        details: true,
        outputFolder: "allure-results",
        suiteTitle: false
      },
    ],
  ],

  use: {
    baseURL: "http://localhost:4200",

    trace: "on-first-retry",
    video: "on",
  },
  projects: [
    {
      name: "chromium",
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "mobile",
      testMatch: "inline-form-mobile.spec.ts",
      use: {
        ...devices["iPhone 13 Pro Max"],
      },
    },
  ],
});
