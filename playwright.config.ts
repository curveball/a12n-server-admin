import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default defineConfig({
    testMatch: '**/*.spec.ts',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:5173',
        headless: false,
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
    },
    reporter: 'line',
});
