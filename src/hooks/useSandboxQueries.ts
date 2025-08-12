import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAxios, useServerStats } from '.';
import { getAllUsers } from '../api';

const useSandboxQueries = () => {
    const api = useAxios();
    const [method, setMethod] = useState<string>('GET');
    const [fullUrl, setFullUrl] = useState<string>(`${import.meta.env.VITE_AUTH_SERVER_URL}`);
    // set query options
    const [options, setOptions] = useState<QueryOptions>({});
    // set request route params
    const [params, setParams] = useState<string>('/');
    // set query key
    const [queryKey, setQueryKey] = useState<string[]>(['stats']);
    const [requestRoute, setRequestRoute] = useState<string | undefined>('/');

    const { queryOptions: serverStatsOptions, queryParams: serverStatsParams } = useServerStats();

    const { data, error, isLoading, isFetching, refetch } = useQuery({ ...options, queryKey: queryKey as string[] });

    useEffect(() => {
        setFullUrl(`${import.meta.env.VITE_AUTH_SERVER_URL}${requestRoute}${params}`);
        switch (requestRoute) {
            case '/users':
                setMethod('GET');
                setRequestRoute(`/users`);
                setOptions(getAllUsers(api) as QueryOptions);
                setParams('/user?embed=item');
                setQueryKey(['users']);
                break;
            case '/':
            default:
                // eslint-disable-next-line react-hooks/rules-of-hooks
                setMethod('GET');
                setRequestRoute(`/`);
                setOptions(serverStatsOptions as QueryOptions);
                setParams(serverStatsParams as string);
                setQueryKey(['stats']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestRoute]);

    return {
        method,
        queryOptions: options,
        queryParams: params,
        requestRoute,
        setRequestRoute,
        data,
        error,
        isLoading,
        isFetching,
        refetch,
        fullUrl,
        setFullUrl,
    };
};

export default useSandboxQueries;
