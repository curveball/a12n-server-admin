import { describe, it, expect, beforeEach, vi, Mock, afterEach } from 'vitest';
import { getAllUsers, getVerifiedUsers } from '../utils/queries/users';
import { QueryClient } from '@tanstack/react-query';

describe('queries', () => {
  let mockClient: { get: Mock };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
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

  describe('getVerifiedUsers', () => {
    it('should call client.get for users and then for each user\'s identity', async () => {
      mockClient.get
        .mockResolvedValueOnce({
          _links: {
            item: [
              { href: '/user/1' },
              { href: '/user/2' },
            ],
          },
        })
        .mockResolvedValueOnce({
          _links: {
            item: [
              { href: '/user/1/identity/xyz' },
            ],
          },
        })
        .mockResolvedValueOnce({ verifiedAt: '2023-01-01T00:00:00Z' })
        .mockResolvedValueOnce({
          _links: {
            item: [
              { href: '/user/2/identity/abc' },
            ],
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
});