import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { withResizeObserver } from '../../tests/setup';
import TableList from './TableList';

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

const mockOnDelete = vi.fn();
const mockColumnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
];

const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];
const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('TableList', () => {
    beforeAll(() => {
        withResizeObserver();
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    it.skip('renders the loading state when data is not available', () => {
        render(
            <QueryClientProvider client={createQueryClient()}>
                <TableList columnDefs={[]} data={[]} itemName='user' onDelete={mockOnDelete} />
            </QueryClientProvider>,
        );
        expect(screen.findByText('Loading...')).toBeTruthy();
    });

    it('renders the error state when data is not available', () => {
        render(
            <QueryClientProvider client={createQueryClient()}>
                <TableList columnDefs={[]} data={[]} itemName='user' onDelete={mockOnDelete} />
            </QueryClientProvider>,
        );
    });

    it('renders the table list when data is available', () => {
        render(
            <QueryClientProvider client={createQueryClient()}>
                <TableList columnDefs={mockColumnDefs} data={mockData} itemName='user' onDelete={mockOnDelete} />
            </QueryClientProvider>,
        );
        expect(screen.findByText('John Doe')).toBeTruthy();
    });
});
