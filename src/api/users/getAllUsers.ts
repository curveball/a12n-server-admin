import { queryOptions } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { Collection, User } from '../../types';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

const getAllUsers = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.users.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS], { embed: 'item' }),
            })) as Collection<User>;
            return data;
        },
    });
};

export default getAllUsers;
