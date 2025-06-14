import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUsers } from '..';
import { useAxios } from '../../hooks';

const useAllUsersQuery = () => {
    const api = useAxios();
    const options = getAllUsers(api);

    const { data, isLoading, error, refetch, isRefetching } = useQuery(options);

    const queryClient = useQueryClient();

    const prefetchUsers = async () => {
        await queryClient.prefetchQuery(options);
    };

    return { data, isLoading, error, refetch, isRefetching, prefetchUsers };
};

export default useAllUsersQuery;
