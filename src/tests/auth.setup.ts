import { expect, test as setup } from '@playwright/test';
import { CLIENT_ROUTES } from '../utils/constants';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto(CLIENT_ROUTES.AUTH_TRIGGER);

    await expect(page.url()).toContain(`http://localhost:5173/`);

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.context().storageState({ path: authFile });
});
