import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from './core';
import { formatAPIPath } from '../helpers/common';
import { SERVER_EMBED_ITEM_PARAM, SERVER_ROUTES } from '../constants';
import { Collection, User } from '../types';
import APICore from '../api';

export const getAllUsers = (client: APICore) => {
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
