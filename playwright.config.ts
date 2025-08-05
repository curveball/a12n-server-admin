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
        { name: 'OAuthFlow', testMatch: /.*\.OAuthProvider\.ts/ },
        // Add all other tests here
        // Logout must come last because the logout step will clear the auth state required for testing logged-in scenarios
        { name: 'Logout', testMatch: /.*\.logout\.ts/ },
    ],
    // Configure TypeScript compilation properly
    use: {
        // This forces Playwright to use proper TS compilation
        actionTimeout: 0,
    },
    globalSetup: undefined,
    globalTeardown: undefined,
});
