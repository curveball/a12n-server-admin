import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `.env` });

const devServerConfig = {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
};

const ciConfig = [
    {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
    },
    {
        command: 'npm run setup:backend',
        url: 'http://localhost:8571',
        reuseExistingServer: !process.env.CI,
        cwd: path.join(process.cwd(), 'src/tests/a12n-server'),
    },
];

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
    projects: [
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts|global\.setup\.ts/,
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
        {
            name: 'teardown',
            testMatch: /global\.teardown\.ts/,
        },
    ],
    webServer: process.env.CI ? ciConfig : devServerConfig,
});
