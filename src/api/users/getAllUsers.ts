import { queryOptions } from '@tanstack/react-query';
import { Collection, User } from '../../types';
import { SERVER_EMBED_ITEM_PARAM, SERVER_ROUTES } from '../../utils/constants';
import { formatAPIPath } from '../../utils/helpers/common';
import APICore from '../core';
import { queryKeys } from '../queries/core';

const getAllUsers = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.users.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS], SERVER_EMBED_ITEM_PARAM),
            })) as Collection<User>;
            return data;
        },
    });
};

export default getAllUsers;
