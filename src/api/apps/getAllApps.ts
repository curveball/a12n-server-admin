import { queryOptions } from '@tanstack/react-query';
import { HalLink } from 'hal-types';
import { App, Collection, Resource } from '../../types';
import { SERVER_ROUTES } from '../../utils/constants';
import { formatAPIPath } from '../../utils/helpers/common';
import APICore from '../core';
import { queryKeys } from '../query-keys';

const getAllApps = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.apps.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.APPS]),
            })) as Collection<App>;

            const apps = data._links.item as HalLink[];
            console.log(apps);
            // Need to manually unpack
            const appDetailsPromises = apps.map(async (app: HalLink) => {
                try {
                    // Fetch each app's detailed information using its href
                    const appData = (await client.get({
                        suffix: formatAPIPath([app.href]),
                    })) as Resource<App>;
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

export default getAllApps;
