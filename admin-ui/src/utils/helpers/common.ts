export const formatAPIPath = (
    args: (string | number)[],
    queryParams?: Record<string, string | number | boolean | undefined>,
): string => {
    let formattedURL = args.map((arg) => `/${arg.toString().replace(/^\/+/, '')}`).join('');

    if (queryParams) {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
            .join('&');

        if (queryString) formattedURL += `?${queryString}`;
    }

    return formattedURL;
};
