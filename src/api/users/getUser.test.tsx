/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useGetUserQuery from './getUser';

describe('useGetUserQuery', () => {
    let mockClient: { get: Mock };
    const userId = 'test-user-id';

    beforeEach(() => {
        mockClient = {
            get: vi.fn(),
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should call client.get with the correct suffix', async () => {
        const queryObj = useGetUserQuery(mockClient as any, userId);

        await queryObj.queryFn!({
            queryKey: ['users', userId],
            signal: new AbortController().signal,
            meta: undefined,
            client: {} as QueryClient,
        });

        expect(mockClient.get).toHaveBeenCalledTimes(1);
        expect(mockClient.get).toHaveBeenCalledWith(
            expect.objectContaining({
                suffix: expect.stringContaining(`/user/${userId}`),
            }),
        );
    });
});
