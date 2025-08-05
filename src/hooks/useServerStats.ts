import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAxios } from '.';
import { HalLink } from '../types';
import { Resource, ServerStats, UserInfo } from '../types/models';

const useServerStats = () => {
    const api = useAxios();

    const options = queryOptions({
        enabled: true,
        queryKey: ['stats'],
        throwOnError: true,
        queryFn: async () =>
            (await api.get({
                suffix: `/?_browser-accept=${encodeURIComponent('application/hal+json')}`,
                onError: (error) => {
                    console.error(error);
                },
            })) as Resource<ServerStats>,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 3600,
    });

    const { data, isLoading, error, refetch, isRefetching } = useQuery(options);

    const authenticatedAsHref = data?._links?.['authenticated-as'] as HalLink;

    const authenticatedUserOptions = queryOptions({
        enabled: !!authenticatedAsHref,
        queryKey: ['authenticated-as'],
        throwOnError: true,
        queryFn: async () =>
            (await api.get({
                suffix: authenticatedAsHref?.href,
                onError: (error) => {
                    console.error(error);
                },
            })) as Resource<UserInfo>,
        staleTime: 1000 * 60 * 5,
    });

    const { data: authenticatedUser } = useQuery(authenticatedUserOptions);

    useEffect(() => {
        if (!isLoading || !data) {
            refetch();
        }
    }, [isLoading, data, refetch]);

    return {
        data,
        isLoading,
        error,
        refetch,
        isRefetching,
        authenticatedUser,
    };
};

export default useServerStats;
