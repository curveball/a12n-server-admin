import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { CreateGroupAPIRequest } from '../../types/api';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

function useCreateGroupQuery(client: APICore) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: queryKeys.groups.create,
        mutationFn: async ({
            nickname,
        }: {
            nickname: string;
        }) => {
            const body: CreateGroupAPIRequest = {
                type: 'group',
                nickname: nickname,
            };

            const response = await client.post({
                suffix: formatAPIPath([SERVER_ROUTES.GROUPS]),
                body,
            });

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
        },
    });
}

export default useCreateGroupQuery;