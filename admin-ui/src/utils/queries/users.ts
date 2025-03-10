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
}

export function usersWithVerificationQuery(api: AxiosInstance) {
    return queryOptions({
        queryKey: ['usersWithVerification'],
        queryFn: () => getUsersWithVerification(api),
    });
}

const getUsers = async (api: AxiosInstance) => {
    const res = await api.get('http://localhost:8531/user?embed=item');
    return res.data;
};

const getUsersWithVerification = async (api: AxiosInstance) => {
    const res = await api.get('http://localhost:8531/user?embed=item');
    const users = res.data['_embedded'].item;

    // Fetch identity information for each user
    const usersWithVerification = await Promise.all(
        users.map(async (user: any) => {
            const identityRes = await api.get(`http://localhost:8531${user._links.self.href}/identity`);
            const identityDetailsRes = await api.get(`http://localhost:8531${identityRes.data._links.item[0].href}`);
            return {
                ...user,
                verified: identityDetailsRes.data.verifiedAt != null,
            };
        }),
    );

    return {
        ...res.data,
        _embedded: {
            item: usersWithVerification,
        },
    };
};
