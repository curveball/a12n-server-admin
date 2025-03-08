import { queryOptions } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export function usersQuery(api: AxiosInstance) {
    return queryOptions({
        queryKey: ['users'],
        queryFn: () => getUsers(api),
    });
}

const getUsers = async (api: AxiosInstance) => {
    const res = await api.get('http://localhost:8531/user?embed=item');

    if (res.status >= 300) {
        throw new Error('Network response was not ok');
    }

    return res.data;
};
