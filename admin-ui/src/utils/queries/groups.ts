import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './core';
import { formatAPIPath } from '../helpers/common';
import { ResourceType, SERVER_EMBED_ITEM_PARAM, SERVER_ROUTES } from '../constants';
import { Collection, Group } from '../types';
import APICore from '../api';

export const getAllGroups = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.groups.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.GROUPS], SERVER_EMBED_ITEM_PARAM),
            })) as Collection<Group>;
            return data;
        },
    });
};
