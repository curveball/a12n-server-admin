import { QueryOptions } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useAxios } from '.';
import { getAllUsers } from '../api';

const useSandboxQueries = () => {
    let queryOptions: QueryOptions = {};
    let queryParams: string = '';
    const api = useAxios();
    const route = useLocation();
    switch (route.pathname) {
        case '/users/sandbox':
            queryOptions = getAllUsers(api) as QueryOptions;
            queryParams = '/user?embed=item';
            break;
    }
    return { queryOptions, queryParams };
};

export default useSandboxQueries;
