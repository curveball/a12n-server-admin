import { queryOptions } from '@tanstack/react-query';

export function userQuery(href: string) {
    return queryOptions({
        queryKey: ['users', href],
        queryFn: () => getUser(href),
    });
}

const getUser = async (href: string) => {
    const res = await fetch('http://localhost:8531' + href, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
    });
    return res.json();
};
