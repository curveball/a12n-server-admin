/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAllUsersQuery } from '../../api';
import UserList from './UserList';
ModuleRegistry.registerModules([AllCommunityModule]);

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
        queryFn: async () => vi.fn(),
    }),
    useCreateUserQuery: () => ({
        mutateAsync: async () => Promise.resolve({}),
    }),
    useAllUsersQuery: vi.fn(),
}));

vi.mock('ag-grid-react', (): any => ({
    AgGridReact: (props: any) => {
        if (props.onSelectionChanged) {
            (window as any).mockAgGridSelectionChanged = props.onSelectionChanged;
        }
        if (props.onRowDoubleClicked) {
            (window as any).mockAgGridRowDoubleClicked = props.onRowDoubleClicked;
        }
        return (
            <div
                data-testid='ag-grid-mock'
                data-column-defs={JSON.stringify(props.columnDefs || [])}
                data-row-data={JSON.stringify(props.rowData || [])}
            >
                AG Grid Mock Component
            </div>
        );
    },
}));

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('UserList Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders loading state initially', async () => {
        vi.mocked(useAllUsersQuery).mockImplementation(() => ({
            data: undefined,
            isLoading: true,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            prefetchUsers: async () => Promise.resolve(),
        }));
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(await screen.findByText('Loading...')).toBeInTheDocument();
    });

    it('renders the table list when data is available', async () => {
        const mockSuccessResponse = {
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
        };
        vi.mocked(useAllUsersQuery).mockImplementation(() => ({
            data: mockSuccessResponse as any,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            prefetchUsers: vi.fn(),
        }));
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserList />
            </QueryClientProvider>,
        );
        expect(screen.findByText('John Doe')).toBeTruthy();
        expect(screen.findByText('Jane Smith')).toBeTruthy();
    });
});
