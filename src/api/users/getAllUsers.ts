import { queryOptions } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

const getAllUsers = (client: APICore) => {
    return queryOptions({
        enabled: true,
        queryKey: queryKeys.users.all,
        queryFn: async () =>
            await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS], { embed: 'item' }),
            }),
        throwOnError: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 3600, // 1 hour
    });
};

export default getAllUsers;
