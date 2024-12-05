import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 4,

    reporter: [
        ['list'],
        ['json', { outputFile: 'json-report/json-report.json' }],
        [
            'allure-playwright',
            {
                details: true,
                outputFolder: 'allure-results',
                suiteTitle: false,
            },
        ],
    ],

    use: {
        baseURL: 'http://localhost:4200',

        trace: 'on-first-retry',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
        },

        {
            name: 'webkit',
        },

        {
            name: 'mobile',
            testMatch: 'inline-form-mobile.spec.ts',
            use: {
                ...devices['iPhone 13 Pro Max'],
            },
        },
    ],
});
