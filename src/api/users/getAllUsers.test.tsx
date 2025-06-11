/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getAllUsers from './getAllUsers';

describe('getAllUsers', () => {
    let mockClient: { get: Mock };

    beforeEach(() => {
        mockClient = {
            get: vi.fn(),
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should call client.get with the correct suffix', async () => {
        const queryObj = getAllUsers(mockClient as any);

        await queryObj.queryFn!({
            queryKey: ['users'],
            signal: new AbortController().signal,
            meta: undefined,
            client: {} as QueryClient,
        });

        expect(mockClient.get).toHaveBeenCalledTimes(1);
        expect(mockClient.get).toHaveBeenCalledWith(
            expect.objectContaining({
                suffix: expect.stringContaining('/user?embed=item'),
            }),
        );
    });
});
