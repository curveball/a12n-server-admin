import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

function useCreateAppQuery(client: APICore) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: queryKeys.posts.app,
        mutationFn: async ({ nickname }: { nickname: string }) => {
            const response = await client.post({
                suffix: formatAPIPath([SERVER_ROUTES.APPS]),
                body: {
                    type: 'app',
                    nickname: nickname,
                },
            });

            return response;
        },
        onSuccess: () => {
            // Invalidate and refetch apps list after successful creation
            queryClient.invalidateQueries({ queryKey: queryKeys.apps.all });
        },
    });
}

export default useCreateAppQuery;
