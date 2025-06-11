import { APIQueryParams } from '../types';

/**
 * Formats a URL path with optional query parameters.
 * @param args - The path segments to join.
 * @param queryParams - Optional query parameters to append to the path.
 * @returns The formatted URL path.
 *
 * @example
 *
 * Basic path
 * formatAPIPath(['users', '123'])
 * // returns '/users/123'
 *
 * With query parameters
 *
 * formatAPIPath(['users', '123'], { embed: 'item' })
 * // returns '/users/123?embed=item'
 *
 * formatAPIPath(['users', 123], { filter: 'active', sort: 'name' })
 * // returns '/users/123?filter=active&sort=name'
 */

export default function formatAPIPath(args: (string | number)[], queryParams?: APIQueryParams): string {
    let formattedURL = args.map((arg) => `/${arg.toString().replace(/^\/+/, '')}`).join('');

    if (queryParams) {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
            .join('&');

        if (queryString) formattedURL += `?${queryString}`;
    }

    return formattedURL;
}
