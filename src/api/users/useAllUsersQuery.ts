import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAllUsers, getVerifiedUsers } from '..';
import { useAxios } from '../../hooks';

const useAllUsersQuery = () => {
    const api = useAxios();
    const options = getAllUsers(api);
    const verifiedUsersOptions = getVerifiedUsers(api);

    const { data, isLoading, error, refetch, isRefetching } = useQuery(options);
    const { data: verifiedUsers } = useQuery(verifiedUsersOptions);

    useEffect(() => {
        if (data) {
            data?._embedded?.item?.map((user) => ({
                ...user,
                verified: verifiedUsers?.has(user['_links']?.self?.href) ? true : false,
            }));
        }
    }, [data, verifiedUsers]);

    const queryClient = useQueryClient();

    const prefetchUsers = async () => {
        await queryClient.prefetchQuery(options);
    };

    return { data, isLoading, error, refetch, isRefetching, verifiedUsers, prefetchUsers };
};

export default useAllUsersQuery;
