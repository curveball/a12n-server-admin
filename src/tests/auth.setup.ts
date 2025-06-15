import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto(`/register`);

    await expect(page.url()).toContain(`http://localhost:5173/register`);

    await page.fill('input[name="nickname"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="emailAddress"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.fill('input[name="confirmPassword"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.context().storageState({ path: authFile });
});

setup('login', async ({ page }) => {
    await page.goto(`/login`);

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.context().storageState({ path: authFile });
});
