import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResourceType, SERVER_ROUTES } from '../../utils/constants';
import { formatAPIPath } from '../../utils/helpers/common';
import APICore from '../core';
import { queryKeys } from '../queries/core';

function useUpdateUserQuery(client: APICore) {
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

export default useUpdateUserQuery;
