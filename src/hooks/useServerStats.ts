import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAxios } from '.';
import { Resource, ServerStats } from '../types/models';

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
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 3600, // 1 hour
    });

    const { data, isLoading, error, refetch, isRefetching } = useQuery(options);

    useEffect(() => {
        if (!isLoading || !data) {
            refetch();
        }
    }, [isLoading, data, refetch]);

    return { data, isLoading, error, refetch, isRefetching };
};

export default useServerStats;
