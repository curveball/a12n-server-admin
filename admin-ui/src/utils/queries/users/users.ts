import { queryOptions } from '@tanstack/react-query';

export function usersQuery() {
    return queryOptions({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

const getUsers = async () => {
    const res = await fetch('http://localhost:8531/user?embed=item', {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
    });

    if (res.status === 401) {
        // Handle 401 Unauthorized error
        // For example, redirect to login page or show an error message
        window.location.href = '/'; // Redirect to login page
        throw new Error('Unauthorized. Please log in.');
    }

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();
};
