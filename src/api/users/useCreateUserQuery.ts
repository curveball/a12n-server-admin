import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

function useCreateUserQuery(client: APICore) {
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

export default useCreateUserQuery;
