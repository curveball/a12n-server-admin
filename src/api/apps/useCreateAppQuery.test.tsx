/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useCreateAppQuery from './useCreateAppQuery';

// Mock the queryClient invalidateQueries method
const mockQueryClient = {
    invalidateQueries: vi.fn(),
};

// Mock the useQueryClient hook
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query');
    return {
        ...actual,
        useQueryClient: () => mockQueryClient,
        useMutation: (options: any) => {
            // Return a mock mutation object that calls the mutationFn when mutate is called
            return {
                mutate: (variables: any, callbacks?: any) => {
                    // Call the mutationFn
                    options
                        .mutationFn(variables)
                        .then(() => {
                            // Call onSuccess if provided
                            options.onSuccess();
                            callbacks?.onSuccess?.();
                        })
                        .catch((error: any) => {
                            callbacks?.onError?.(error);
                        });
                },
                isPending: false,
            };
        },
    };
});

describe('useCreateAppQuery', () => {
    let mockClient: { post: Mock };

    beforeEach(() => {
        mockClient = {
            post: vi.fn().mockResolvedValue({ id: 'test-app-id', nickname: 'Test App' }),
        };
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should call client.post with correct parameters', async () => {
        const mutation = useCreateAppQuery(mockClient as any);

        await new Promise<void>((resolve) => {
            mutation.mutate(
                { nickname: 'Test App' },
                {
                    onSuccess: () => resolve(),
                },
            );
        });

        expect(mockClient.post).toHaveBeenCalledTimes(1);
        expect(mockClient.post).toHaveBeenCalledWith({
            suffix: '/app',
            body: {
                type: 'app',
                nickname: 'Test App',
            },
        });
    });

    it('should invalidate apps query on success', async () => {
        const mutation = useCreateAppQuery(mockClient as any);

        await new Promise<void>((resolve) => {
            mutation.mutate(
                { nickname: 'Test App' },
                {
                    onSuccess: () => resolve(),
                },
            );
        });

        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
            queryKey: ['apps'],
        });
    });
});
