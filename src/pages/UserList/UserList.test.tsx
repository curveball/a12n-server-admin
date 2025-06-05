/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UserList from './UserList';

vi.mock('../utils/hooks', () => ({
    useAxios: () => ({}),
}));

interface QueryResult<T, K extends string = string> {
    queryKey: [K];
    queryFn: () => Promise<T>;
}

vi.mock('../utils/queries/users', () => ({
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
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    it('renders loading state initially', async () => {
        vi.mock('../utils/queries/users', () => ({
            getAllUsers: () => ({
                queryKey: ['users'],
                queryFn: () => new Promise(() => {}),
            }),
            getVerifiedUsers: () => ({
                queryKey: ['verifiedUsers'],
                queryFn: () => new Promise(() => {}),
            }),
            useCreateUserQuery: () => ({
                mutateAsync: async () => Promise.resolve({}),
            }),
        }));

        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <UserList />
            </QueryClientProvider>,
        );

        expect(await screen.findByText('Loading...')).toBeInTheDocument();
    });

    it('renders the error state when data is not available', () => {
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.findByText('Error: No data available')).toBeTruthy();
    });

    it('renders the table list when data is available', () => {
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.findByText('John Doe')).toBeTruthy();
        expect(screen.findByText('Jane Smith')).toBeTruthy();
    });
});
