import { queryOptions } from '@tanstack/react-query';
import { Collection } from '../../types';
import { SERVER_ROUTES } from '../../utils/constants';
import { formatAPIPath } from '../../utils/helpers/common';
import APICore from '../core';
import { queryKeys } from '../queries/core';

const getAllPrivileges = (client: APICore) => {
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
export default getAllPrivileges;
