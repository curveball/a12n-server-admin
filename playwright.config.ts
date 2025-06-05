import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default defineConfig({
    testMatch: '**/*.spec.ts',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:5173',
        headless: process.env.CI ? true : false,
        httpCredentials: {
            username: process.env.VITE_AUTH_SERVER_EMAIL || '',
            password: process.env.VITE_AUTH_SERVER_PASSWORD || '',
        },
    },
    globalTeardown: './src/tests/global.teardown.ts',
    webServer: [
        {
            command: 'npm run dev',
            url: 'http://localhost:5173',
            reuseExistingServer: !process.env.CI,
            stdout: 'ignore',
            stderr: 'pipe',
        },
        {
            command: 'npm run setup:backend',
            url: 'http://localhost:8531',
            reuseExistingServer: !process.env.CI,
        },
    ],
});
