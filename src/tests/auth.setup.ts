/**
 * Preserves and enables logged in state
 *  before e2e playwright tests
 * See https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
 */
import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('login', async ({ page }) => {
    await page.goto(`${process.env.VITE_AUTH_SERVER_URL!}/login`);

    expect(page.url()).toContain(process.env.VITE_AUTH_SERVER_URL!);

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await page.context().storageState({ path: authFile });
});
