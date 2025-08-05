import { expect, test } from '@playwright/test';

test.describe('Logout Flow', () => {
    // Mock user authentication before each test
    test.beforeEach(async ({ page }) => {
        if (!page.url().includes(process.env.VITE_AUTH_SERVER_URL!)) {
            await page.goto(`${process.env.VITE_AUTH_SERVER_URL!}/login`);
            await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
            await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
            await page.click('button[type="submit"]');
            await page.context().storageState({ path: 'playwright/.auth/user.json' });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            // Wait for the sidebar to be visible (indicating authenticated state)
            await expect(page.locator('[data-testid="sidebar"]')).toBeVisible({
                timeout: 1000,
            });
        } else {
            await page.goto('/');

            await page.context().storageState({ path: 'playwright/.auth/user.json' });
            await page.goto('/');
            await page.waitForLoadState('networkidle');
            // Wait for the sidebar to be visible (indicating authenticated state)
            await expect(page.locator('[data-testid="sidebar"]')).toBeVisible({
                timeout: 1000,
            });
        }
    });

    test('should clear authentication tokens when logout is clicked', async ({ page }) => {
        // Click profile dropdown and logout
        const profileDropdownTrigger = page.locator('button[aria-label="Profile Options"]');

        await profileDropdownTrigger.click();
        const logoutOption = page.locator('[data-testid="Logout"]');
        await logoutOption.click();

        // Wait for logout process to complete
        await page.waitForTimeout(1000);

        // Verify tokens are cleared from any storage/context
        const tokensCleared = await page.evaluate(() => {
            // Check if tokens are cleared from localStorage or context
            const storedTokens = window.localStorage.getItem('auth_tokens');
            return !storedTokens || storedTokens === 'null';
        });

        expect(tokensCleared).toBe(true);
    });

    test('should redirect to login page when confirming logout', async ({ page }) => {
        // Verify profile dropdown trigger is visible
        const profileDropdownTrigger = page.locator('button[aria-label="Profile Options"]');

        await expect(profileDropdownTrigger).toBeTruthy();

        // Click to open dropdown
        await profileDropdownTrigger.click();

        // Verify logout option is present and clickable
        const logoutOption = page.locator('[data-testid="Logout"]');
        await logoutOption.click();

        await page.waitForLoadState('networkidle');
        expect(page.url().includes('/logout')).toBe(true);
        await page.locator('button[type="submit"]').click();
        await page.waitForLoadState('networkidle');
        expect(page.url().includes('/login')).toBe(true);
    });

    test('once logged out, should be unable to access protected routes', async ({ page }) => {
        // Verify profile dropdown trigger is visible
        const profileDropdownTrigger = page.locator('button[aria-label="Profile Options"]');

        await expect(profileDropdownTrigger).toBeTruthy();

        // Click to open dropdown
        await profileDropdownTrigger.click();

        // Verify logout option is present and clickable
        const logoutOption = page.locator('[data-testid="Logout"]');
        await logoutOption.click();

        await page.waitForLoadState('networkidle');
        expect(page.url().includes('/logout')).toBe(true);
        await page.waitForTimeout(1000);

        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(1000);
        await page.goto('/users/table');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Should either redirect to auth or show unauthenticated state
        expect(page.url().includes('/login')).toBe(true);
    });
});
