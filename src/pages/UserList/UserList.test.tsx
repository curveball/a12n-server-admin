/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAllUsersQuery } from '../../api';
import UserList from './UserList';

vi.mock('../utils/hooks', () => ({
    useAxios: () => ({}),
}));

interface QueryResult<T, K extends string = string> {
    queryKey: [K];
    queryFn: () => Promise<T>;
}

vi.mock('../../api/users', () => ({
    getAllUsers: () => ({
        queryKey: ['users'],
        queryFn: async () =>
            Promise.resolve({
                _links: {
                    self: {
                        href: '/users',
                    },
                },
                total: 2,
                _embedded: {
                    item: [
                        { id: 1, name: 'John Doe', email: 'john@example.com', _links: { self: { href: '/users/1' } } },
                        {
                            id: 2,
                            name: 'Jane Smith',
                            email: 'jane@example.com',
                            _links: { self: { href: '/users/2' } },
                        },
                    ],
                },
            }),
    }),
    getVerifiedUsers: (): QueryResult<Set<string>> => ({
        queryKey: ['verifiedUsers'],
        queryFn: async () => Promise.resolve(new Set(['/users/1'])),
    }),
    useCreateUserQuery: () => ({
        mutateAsync: async () => Promise.resolve({}),
    }),
    useAllUsersQuery: vi.fn().mockReturnValue({
        refetch: vi.fn(),
        data: {
            total: 3,
            _embedded: {
                item: [
                    { id: 1, nickname: 'John Doe', email: 'john@example.com', _links: { self: { href: '/users/1' } } },
                    {
                        id: 2,
                        nickname: 'Jane Smith',
                        email: 'jane@example.com',
                        _links: { self: { href: '/users/2' } },
                    },
                ],
            },
        },
    }),
}));

vi.mock('ag-grid-react', () => ({
    AgGridReact: (props: any) => {
        if (props.onSelectionChanged) {
            (window as any).mockAgGridSelectionChanged = props.onSelectionChanged;
        }
        if (props.onRowDoubleClicked) {
            (window as any).mockAgGridRowDoubleClicked = props.onRowDoubleClicked;
        }
        return <div data-testid='ag-grid' />;
    },
}));

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('UserList Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('renders loading state initially', async () => {
        const queryClient = createQueryClient();
        vi.mocked(useAllUsersQuery).mockReturnValueOnce({
            data: undefined,
            isLoading: true,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            verifiedUsers: new Set(),
            prefetchUsers: vi.fn(),
        });
        render(
            <QueryClientProvider client={queryClient}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.queryByText('Loading...')).toBeTruthy();
    });

    it('renders the error state when data is not available', async () => {
        vi.clearAllMocks();
        vi.mocked(useAllUsersQuery).mockReturnValueOnce({
            data: undefined,
            isLoading: false,
            error: new Error('No data available'),
            refetch: vi.fn(),
            isRefetching: false,
            verifiedUsers: new Set(),
            prefetchUsers: vi.fn(),
        });
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.getByText('Error: No data available')).toBeTruthy();
    });

    it('renders the table list when data is available', async () => {
        vi.clearAllMocks();
        vi.mocked(useAllUsersQuery).mockReturnValueOnce({
            data: {
                total: 3,
                _embedded: {
                    item: [
                        {
                            id: 1,
                            nickname: 'John Doe',
                            email: 'john@example.com',
                            _links: { self: { href: '/users/1' } },
                        },
                        {
                            id: 2,
                            nickname: 'Jane Smith',
                            email: 'jane@example.com',
                            _links: { self: { href: '/users/2' } },
                        },
                    ],
                },
            },
            isLoading: false,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            verifiedUsers: new Set(),
            prefetchUsers: vi.fn(),
        });
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.findByText('John Doe')).toBeTruthy();
        expect(screen.findByText('Jane Smith')).toBeTruthy();
    });
});
