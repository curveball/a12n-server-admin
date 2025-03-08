import { queryOptions } from '@tanstack/react-query';

export function usersQuery(tokens: { accessToken: string }) {
    return queryOptions({
        queryKey: ['users'],
        queryFn: () => getUsers(tokens),
    });
}

const getUsers = async (tokens: { accessToken: string }) => {
    const res = await fetch('http://localhost:8531/user?embed=item', {
        headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
        },
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();
};
