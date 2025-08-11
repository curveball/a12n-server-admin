import { QueryOptions } from '@tanstack/react-query';
import { useState } from 'react';
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

    switch (route.pathname) {
        case '/sandbox':
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { queryOptions, queryParams } = useServerStats();
            setOptions(queryOptions as QueryOptions);
            setParams(queryParams as string);
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
    return { queryOptions: options, queryParams: params };
};

export default useSandboxQueries;
