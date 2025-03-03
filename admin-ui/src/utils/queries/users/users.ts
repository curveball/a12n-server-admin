import { queryOptions } from '@tanstack/react-query';

export function usersQuery() {
    return queryOptions({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

const getUsers = async () => {
    const res = await fetch('http://localhost:8531/user', {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
    });
    return res.json();
};
