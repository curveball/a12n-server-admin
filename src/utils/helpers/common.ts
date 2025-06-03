import { APIQueryParams } from '../types';

export const formatAuthorizationHeader = (token: string) => {
    return `Bearer ${token}`;
};

export const formatAPIPath = (args: (string | number)[], queryParams?: APIQueryParams): string => {
    let formattedURL = args.map((arg) => `/${arg.toString().replace(/^\/+/, '')}`).join('');

    if (queryParams) {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
            .join('&');

        if (queryString) formattedURL += `?${queryString}`;
    }

    return formattedURL;
};
