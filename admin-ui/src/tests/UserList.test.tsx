import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, expect, beforeEach, describe, it } from 'vitest';
import UserList from '../pages/UserList';
import TableList from '../components/TableList';

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

vi.mock('../containers', () => ({
    CreateUserModal: ({ onClose }: { onClose: () => void }) => (
        <div data-testid='create-user-modal'>
            <button onClick={onClose}>Close</button>
        </div>
    ),
    UpdateUserModal: ({ onClose, userData }: { onClose: () => void; userData: any }) => (
        <div data-testid='update-user-modal'>
            <div data-testid='user-data'>{userData?.name}</div>
            <button onClick={onClose}>Close</button>
        </div>
    ),
}));

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('UserList Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        vi.mock('../utils/queries/users', () => ({
            getAllUsers: () => ({
                queryKey: ['users'],
                queryFn: () => new Promise(() => {}),
            }),
            getVerifiedUsers: () => ({
                queryKey: ['verifiedUsers'],
                queryFn: () => new Promise(() => {}),
            }),
        }));

        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <UserList />
            </QueryClientProvider>,
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});

describe('TableList Tests', () => {
    const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    const mockColumnDefs = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
    ];

    const mockOnDelete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with provided data and column definitions', () => {
        render(<TableList columnDefs={mockColumnDefs} data={mockData} itemName='user' onDelete={mockOnDelete} />);

        expect(screen.getByText('0 users selected')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Filters/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Export/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /New user/i })).toBeInTheDocument();
    });

    it('opens create user modal when New user button is clicked', () => {
        render(<TableList columnDefs={mockColumnDefs} data={mockData} itemName='user' onDelete={mockOnDelete} />);

        fireEvent.click(screen.getByRole('button', { name: /New user/i }));

        expect(screen.getByTestId('create-user-modal')).toBeInTheDocument();
    });

    it('closes create user modal when close button is clicked', () => {
        render(<TableList columnDefs={mockColumnDefs} data={mockData} itemName='user' onDelete={mockOnDelete} />);

        fireEvent.click(screen.getByRole('button', { name: /New user/i }));
        expect(screen.getByTestId('create-user-modal')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Close/i }));
        expect(screen.queryByTestId('create-user-modal')).not.toBeInTheDocument();
    });
});
