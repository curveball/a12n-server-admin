import { QueryOptions } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useAxios, useServerStats } from '.';
import { getAllUsers } from '../api';

const useSandboxQueries = () => {
    let queryOptions: QueryOptions = {};
    let queryParams: string = '';
    const api = useAxios();
    const route = useLocation();
    console.info('route pathname', route.pathname);
    switch (route.pathname) {
        case '/sandbox':
            queryOptions = useServerStats().queryOptions as QueryOptions;
            queryParams = useServerStats().queryParams as string;
            break;
        case '/users/sandbox':
            queryOptions = getAllUsers(api) as QueryOptions;
            queryParams = '/user?embed=item';
            break;
        default:
            queryOptions = {} as QueryOptions;
            queryParams = '';
            break;
    }
    return { queryOptions, queryParams };
};

export default useSandboxQueries;
