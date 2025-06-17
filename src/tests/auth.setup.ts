import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('login', async ({ page }) => {
    await page.goto(`${process.env.VITE_SERVER_URL!}/login`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.context().storageState({ path: authFile });
});
