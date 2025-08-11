import { QueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios, useServerStats } from '.';
import { getAllUsers } from '../api';
/* eslint-disable no-case-declarations */
const useSandboxQueries = () => {
    const api = useAxios();
    const route = useLocation();
    console.info('route pathname', route.pathname);
    const [options, setOptions] = useState<QueryOptions>({});
    const [params, setParams] = useState<string>('');
    const { queryOptions: serverStatsOptions, queryParams: serverStatsParams } = useServerStats();

    useEffect(() => {
        switch (route.pathname) {
            case '/sandbox':
                // eslint-disable-next-line react-hooks/rules-of-hooks
                setOptions(serverStatsOptions as QueryOptions);
                setParams(serverStatsParams as string);
                break;
            case '/users/sandbox':
                setOptions(getAllUsers(api) as QueryOptions);
                setParams('/user?embed=item');
                break;
            default:
                setOptions({} as QueryOptions);
                setParams('');
                break;
        }
    }, [route.pathname]);

    return { queryOptions: options, queryParams: params };
};

export default useSandboxQueries;
