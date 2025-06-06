/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getVerifiedUsers from './getVerifiedUsers';

describe('getVerifiedUsers', () => {
    let mockClient: { get: Mock };

    beforeEach(() => {
        mockClient = {
            get: vi.fn(),
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should call client.get for users and then for each user's identity", async () => {
        mockClient.get
            .mockResolvedValueOnce({
                _links: {
                    item: [{ href: '/user/1' }, { href: '/user/2' }],
                },
            })
            .mockResolvedValueOnce({
                _links: {
                    item: [{ href: '/user/1/identity/xyz' }],
                },
            })
            .mockResolvedValueOnce({ verifiedAt: '2023-01-01T00:00:00Z' })
            .mockResolvedValueOnce({
                _links: {
                    item: [{ href: '/user/2/identity/abc' }],
                },
            })
            .mockResolvedValueOnce({ verifiedAt: null });

        const queryObj = getVerifiedUsers(mockClient as any);

        const result = await queryObj.queryFn!({
            queryKey: ['users', 'verified'],
            signal: new AbortController().signal,
            meta: undefined,
            client: {} as QueryClient,
        });

        expect(mockClient.get).toHaveBeenCalledTimes(5);
        expect(result).toBeInstanceOf(Set);
    });
});
