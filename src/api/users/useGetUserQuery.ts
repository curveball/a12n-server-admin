import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../../hooks';
import { getUser } from '.';

function useGetUserQuery(userId: string) {
    const api = useAxios();
    const options = getUser(api, userId);

    const { data, isLoading, error, refetch, isRefetching } = useQuery(options);

    const queryClient = useQueryClient();

    const prefetchUser = async () => {
        await queryClient.prefetchQuery(options);
    };

    return { data, isLoading, error, refetch, isRefetching, prefetchUser };
}

export default useGetUserQuery;
