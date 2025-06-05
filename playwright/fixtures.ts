import { test as baseTest, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { CLIENT_ROUTES } from '../src/utils/constants';

dotenv.config({ path: `.env` });

export * from '@playwright/test';

export const test = baseTest.extend<
    {
        storageState: string;
    },
    { workerStorageState: string }
>({
    /** eslint-disable-next-line react-hooks/rules-of-hooks - This is NOT a react hook */
    storageState: ({ workerStorageState }, use) => use(workerStorageState),

    // Authenticate once per worker with a worker-scoped fixture.
    workerStorageState: [
        async ({ browser }, useFixture) => {
            const fileName = path.resolve(test.info().project.outputDir, `.auth/user.json`);

            if (fs.existsSync(fileName)) {
                // Reuse existing authentication state if any.
                await useFixture(fileName);
                return;
            }

            // Make sure we authenticate in a clean environment by unsetting storage state.
            const page = await browser.newPage({ storageState: undefined });

            await page.goto(CLIENT_ROUTES.AUTH_TRIGGER);

            await expect(page).toHaveURL(new RegExp(`^${process.env.VITE_SERVER_URL!}`));

            await page.fill('input[name="userName"]', process.env.VITE_AUTH_SERVER_EMAIL!);
            await page.fill('input[name="password"]', process.env.VITE_AUTH_SERVER_PASSWORD!);
            await page.click('button[type="submit"]');

            await expect(page).toHaveURL(CLIENT_ROUTES.USERS_TABLE);

            await page.context().storageState({ path: fileName });
            await page.close();

            /** eslint-disable-next-line react-hooks/rules-of-hooks - This is NOT a react hook */
            await use(fileName);
        },
        { scope: 'worker' },
    ],
});
