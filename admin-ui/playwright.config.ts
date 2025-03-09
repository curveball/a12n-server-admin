import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default defineConfig({
    testDir: 'src/tests/integration',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
    },
    reporter: process.env.CI ? 'github' : 'line',
});
