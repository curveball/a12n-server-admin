import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default defineConfig({
    testMatch: '**/*.spec.ts',
    timeout: 30 * 1000,
    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
        },
        {
            name: 'e2e tests',
            testMatch: '**/*.spec.ts',
            use: {
                baseURL: 'http://localhost:5173',
                headless: process.env.CI ? true : false,
                httpCredentials: {
                    username: process.env.VITE_AUTH_SERVER_EMAIL || '',
                    password: process.env.VITE_AUTH_SERVER_PASSWORD || '',
                },
            },
        },
    ],
});
