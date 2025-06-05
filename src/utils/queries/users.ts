import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { HalLink } from 'hal-types';
import { Collection, Resource, User } from '../../types';
import APICore from '../api';
import { ResourceType, SERVER_EMBED_ITEM_PARAM, SERVER_ROUTES } from '../constants';
import { formatAPIPath } from '../helpers/common';
import { queryKeys } from './core';

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

export const getVerifiedUsers = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.users.detail('verified'),
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS]),
            })) as Collection<User>;

            const verifiedUsers = new Set<string>();

            for (const user of data['_links'].item as HalLink[]) {
                const identityRes = (await client.get({
                    suffix: formatAPIPath([user.href, '/identity']),
                })) as Collection<User>;

                for (const item of identityRes['_links'].item as HalLink[]) {
                    const identityDetailsRes = (await client.get({
                        suffix: formatAPIPath([item.href]),
                    })) as Resource<User>;

                    if (identityDetailsRes.verifiedAt != null) {
                        verifiedUsers.add(user.href);
                    }
                }
            }

            return verifiedUsers;
        },
    });
};

export function useUpdateUserQuery(client: APICore) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: queryKeys.puts.user,
        mutationFn: async ({ nickname, id, active }: { nickname: string; id: string; active: boolean }) => {
            return await client.put({
                suffix: formatAPIPath([SERVER_ROUTES.USERS, id]),
                body: {
                    nickname: nickname,
                    type: ResourceType.USER,
                    active,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail('verified') });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
}

export function useCreateUserQuery(client: APICore) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: queryKeys.posts.user,
        mutationFn: async ({
            nickname,
            email,
            markEmailValid,
            autoGeneratePassword,
        }: {
            nickname: string;
            email: string;
            markEmailValid: string;
            autoGeneratePassword: string;
        }) => {
            if (autoGeneratePassword === 'true') {
                const response = await client.post({
                    suffix: formatAPIPath([SERVER_ROUTES.USERS, 'new']),
                    body: {
                        nickname: nickname,
                        email: email,
                        markEmailValid: markEmailValid,
                        autoGeneratePassword: autoGeneratePassword,
                    },
                });

                return response;
            } else {
                const response = await client.post({
                    suffix: formatAPIPath([SERVER_ROUTES.USERS, 'new']),
                    body: {
                        nickname: nickname,
                        email: email,
                        markEmailValid: markEmailValid,
                    },
                });

                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail('verified') });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
}
