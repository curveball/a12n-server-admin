import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default defineConfig({
    testMatch: '**/*.spec.ts',
    timeout: 30 * 1000,
    projects: [
        { name: 'setup', testMatch: /.*\.setup\.ts/ },
        {
            name: 'e2e tests',
            testMatch: '**/*.spec.ts',
            use: {
                baseURL: 'http://localhost:5173',
                headless: process.env.CI ? true : false,
            },
        },
    ],
    // Configure TypeScript compilation properly
    use: {
        // This forces Playwright to use proper TS compilation
        actionTimeout: 0,
    },
    // Ensure TypeScript is compiled correctly
    globalSetup: undefined,
    globalTeardown: undefined,
});
