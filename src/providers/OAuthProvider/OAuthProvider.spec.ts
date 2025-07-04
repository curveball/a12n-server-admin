// src/tests/OAuthFlow.test.tsx
import { expect, test } from '@playwright/test';
import { CLIENT_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';

test('should trigger OAuth flow and finish at /users/table', async ({ page }) => {
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    await page.goto(CLIENT_ROUTES.AUTH_TRIGGER);

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(CLIENT_ROUTES.USERS_TABLE);
    await expect(page.url()).toBe(`${process.env.VITE_SERVER_URL!}/users/table`);
});

test('should trigger OAuth flow and finish at custom redirect path', async ({ page }) => {
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    await page.goto(formatAPIPath([CLIENT_ROUTES.AUTH_TRIGGER], { redirect: CLIENT_ROUTES.USERS_SANDBOX }));

    await expect(page.url()).toContain(`http://localhost:5173/auth/trigger?redirect=%2Fusers%2Fsandbox`);

    await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
    await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
    await page.click('button[type="submit"]');

    await expect(page.evaluate(() => localStorage.getItem('a12n_ADMIN_UI_CODE_VERIFIER'))).resolves.not.toBeNull();
});
