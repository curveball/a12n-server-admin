import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from './core';
import { formatAPIPath } from '../helpers/common';
import { SERVER_ROUTES } from '../constants';
import APICore from '../api';

export const privilegesQuery = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.privileges.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.PRIVILEGES]),
            })) as any;
            return data;
        },
    });
};
