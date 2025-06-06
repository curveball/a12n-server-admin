import { queryOptions } from '@tanstack/react-query';
import { HalLink } from 'hal-types';
import { Collection, Resource, User } from '../../types';
import { SERVER_ROUTES } from '../../utils/constants';
import { formatAPIPath } from '../../utils/helpers/common';
import APICore from '../core';
import { queryKeys } from '../queries/core';

const getVerifiedUsers = (client: APICore) => {
    return queryOptions({
        queryKey: queryKeys.users.detail('verified'),
        queryFn: async () => {
            const data = (await client.get({
                suffix: formatAPIPath([SERVER_ROUTES.USERS]),
            })) as Collection<User>;

            const verifiedUsers = new Set<string>();

            for (const user of data['_links'].item as HalLink[]) {
                const identityRes = (await client.get({
                    suffix: formatAPIPath([user.href, '/identity']),
                })) as Collection<User>;

                for (const item of identityRes['_links'].item as HalLink[]) {
                    const identityDetailsRes = (await client.get({
                        suffix: formatAPIPath([item.href]),
                    })) as Resource<User>;

                    if (identityDetailsRes.verifiedAt != null) {
                        verifiedUsers.add(user.href);
                    }
                }
            }

            return verifiedUsers;
        },
    });
};

export default getVerifiedUsers;
