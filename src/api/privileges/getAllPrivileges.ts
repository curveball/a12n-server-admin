import { queryOptions } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { Collection } from '../../types/models';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

const getAllPrivileges = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.privileges.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.PRIVILEGES]),
            })) as Collection<Record<string, unknown>>;
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
export default getAllPrivileges;
