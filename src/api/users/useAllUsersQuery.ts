import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { APICore, getAllUsers, getVerifiedUsers } from '..';

const useAllUsersQuery = (client: APICore) => {
    const options = getAllUsers(client);
    const verifiedUsersOptions = getVerifiedUsers(client);

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

    return { data, isLoading, error, refetch, isRefetching, verifiedUsers };
};

export default useAllUsersQuery;
