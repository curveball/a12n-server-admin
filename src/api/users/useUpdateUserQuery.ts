import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVER_ROUTES } from '../../routes';
import { ResourceType, UpdateUserAPIRequest } from '../../types';
import { formatAPIPath } from '../../utils';
import APICore from '../core';
import { queryKeys } from '../query-keys';

function useUpdateUserQuery(client: APICore) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: queryKeys.puts.user,
        mutationFn: async ({ id, userData }: { id: string; userData: UpdateUserAPIRequest }) => {
            return await client.put({
                suffix: formatAPIPath([SERVER_ROUTES.USERS, id]),
                body: userData,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail('verified') });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
}

export default useUpdateUserQuery;
