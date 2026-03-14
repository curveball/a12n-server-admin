import { queryOptions } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';
import { User } from '../../types/models';

function useGetUserQuery(client: APICore, userId: string) {
    return queryOptions({
        enabled: true,
        queryKey: queryKeys.users.detail(userId),
        queryFn: async () =>
            (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS, userId]),
            })) as User,
        throwOnError: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 3600, // 1 hour
    });
}

export default useGetUserQuery;
