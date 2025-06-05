import { queryOptions } from '@tanstack/react-query';
import { Collection } from '../../types';
import APICore from '../api';
import { SERVER_ROUTES } from '../constants';
import { formatAPIPath } from '../helpers/common';
import { queryKeys } from './core';

export const privilegesQuery = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.privileges.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.PRIVILEGES]),
            })) as Collection<Record<string, unknown>>;
            return data;
        },
    });
};
