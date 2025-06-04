import { queryOptions } from '@tanstack/react-query';
import { Collection, Group } from '../../types';
import APICore from '../api';
import { SERVER_ROUTES } from '../constants';
import { formatAPIPath } from '../helpers/common';
import { queryKeys } from './core';

export const getAllGroups = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.groups.all,
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.GROUPS]),
            })) as Collection<Group>;

            const groups = Array.isArray(data._links.item) ? data._links.item : [data._links.item];
            const groupDetailsPromises = groups.map(async (group: { href: string }) => {
                try {
                    const groupData = (await client.get({
                        suffix: formatAPIPath([group.href]),
                    })) as Group;
                    return groupData;
                } catch (error) {
                    console.error('Error fetching group details:', error);
                    return null;
                }
            });
            return Promise.all(groupDetailsPromises);
        },
    });
};
