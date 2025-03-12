import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from './core';
import { formatAPIPath } from '../helpers/common';
import { SERVER_ROUTES } from '../constants';
import APICore from '../api';

export const getAllApps = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.apps.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.APPS]),
            })) as any;

        const apps = data._links.item
        console.log(apps);
        // Need to manually unpack
        const appDetailsPromises = apps.map(async (app: { href: string }) => {
            try {
            // Fetch each app's detailed information using its href
                const appData = (await client.get({
                    suffix: formatAPIPath([app.href]),
                })) as any;
                return appData; // Return detailed app data
            } catch (error) {
                console.error('Error fetching app details:', error);
                return null;
            }
        });

        const appDetails = await Promise.all(appDetailsPromises);
        
        return appDetails;
        },
    });
};
