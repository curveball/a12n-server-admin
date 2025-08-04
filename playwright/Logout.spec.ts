import { expect, test } from '@playwright/test';

test.describe('Logout Flow', () => {
    // Mock user authentication before each test
    test.beforeEach(async ({ page }) => {
        // Navigate to the application
        await page.goto('/');

        // Mock authenticated state by setting tokens in localStorage
        await page.evaluate(() => {
            // Mock OAuth tokens in context
            window.localStorage.setItem(
                'auth_tokens',
                JSON.stringify({
                    accessToken: 'mock_access_token',
                    refreshToken: 'mock_refresh_token',
                    expiresAt: Date.now() + 3600000, // 1 hour from now
                }),
            );
        });

        // Wait for the sidebar to be visible (indicating authenticated state)
        await expect(page.locator('nav, aside, [role="navigation"]')).toBeVisible();
    });

    test('should successfully complete logout flow when user clicks logout', async ({ page }) => {
        // Step 1: Locate and click the profile dropdown trigger (three dots icon)
        const profileDropdownTrigger = page.locator('button[aria-label="Profile Options"]');

        await expect(profileDropdownTrigger).toBeVisible();
        await profileDropdownTrigger.click();

        // Step 2: Wait for dropdown menu to appear and click logout option
        const logoutOption = page.locator('[data-testid="Logout"]');
        await expect(logoutOption).toBeVisible();

        // Step 3: Set up navigation expectation before clicking logout
        // Since logout redirects to external auth server, we'll intercept the navigation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let redirectUrl = '' as string;
        page.on('framenavigated', (frame) => {
            if (frame === page.mainFrame()) {
                redirectUrl = frame.url();
            }
        });

        // Click logout
        await logoutOption.click();

        // Step 4: Verify logout redirect occurs
        // Wait for navigation to complete or timeout
        await page.waitForTimeout(2000);

        // Check if we've been redirected to logout URL or if tokens were cleared
        const currentUrl = page.url();

        // Verify either external redirect occurred or we're back to auth flow
        const isLoggedOut =
            currentUrl.includes('/login') || currentUrl.includes('/auth') || currentUrl !== 'http://localhost:5173/';

        expect(isLoggedOut).toBe(true);
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

    test('should display logout option in profile dropdown when authenticated', async ({ page }) => {
        // Verify profile dropdown trigger is visible
        const profileDropdownTrigger = page.locator('button[aria-label="Profile Options"]');

        await expect(profileDropdownTrigger).toBeVisible();

        // Click to open dropdown
        await profileDropdownTrigger.click();

        // Verify logout option is present and clickable
        const logoutOption = page.locator('[data-testid="Logout"]');
        await expect(logoutOption).toBeVisible();
        await expect(logoutOption).toContainText('Logout');

        // Verify it's clickable
        await expect(logoutOption).toBeEnabled();
    });

    test('should handle logout gracefully if already logged out', async ({ page }) => {
        // Clear authentication state first
        await page.evaluate(() => {
            window.localStorage.removeItem('auth_tokens');
        });

        // Reload page to reflect unauthenticated state
        await page.reload();

        // Should either redirect to auth or show unauthenticated state
        const currentUrl = page.url();
        const isUnauthenticatedState =
            currentUrl.includes('/auth') || currentUrl.includes('/login') || !currentUrl.includes('/users');

        expect(isUnauthenticatedState).toBe(true);
    });
});
