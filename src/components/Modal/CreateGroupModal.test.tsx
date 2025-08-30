import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateGroupModal from './CreateGroupModal';

// Mock dependencies
vi.mock('../../api/groups', () => ({
    useCreateGroupQuery: vi.fn().mockReturnValue({
        mutateAsync: vi.fn().mockResolvedValue({ success: true }),
        isPending: false,
    }),
}));

vi.mock('../../hooks', () => ({
    useAxios: vi.fn().mockReturnValue({}),
    useFormValidation: vi.fn().mockReturnValue({
        formState: { nickname: '' },
        errors: {},
        handleInputChange: vi.fn(),
        isFormValid: vi.fn().mockReturnValue(true),
    }),
}));

describe('CreateGroupModal', () => {
    let queryClient: QueryClient;

    beforeAll(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });
    });

    const renderWithProviders = (component: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                {component}
            </QueryClientProvider>
        );
    };

    it('renders modal when open', () => {
        const mockOnClose = vi.fn();
        
        renderWithProviders(
            <CreateGroupModal isOpen={true} onClose={mockOnClose} />
        );

        expect(screen.getByRole('dialog')).toBeTruthy();
        expect(screen.getByText('Enter in details below to create a new group')).toBeTruthy();
        expect(screen.getByPlaceholderText('Admin Team')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Create Group' })).toBeTruthy();
    });

    it('does not render when closed', () => {
        const mockOnClose = vi.fn();
        
        renderWithProviders(
            <CreateGroupModal isOpen={false} onClose={mockOnClose} />
        );

        expect(screen.queryByRole('dialog')).toBeFalsy();
    });

    it('calls onClose when cancel button is clicked', () => {
        const mockOnClose = vi.fn();
        
        renderWithProviders(
            <CreateGroupModal isOpen={true} onClose={mockOnClose} />
        );

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelButton);
        
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('shows the group name field with proper label', () => {
        const mockOnClose = vi.fn();
        
        renderWithProviders(
            <CreateGroupModal isOpen={true} onClose={mockOnClose} />
        );

        expect(screen.getByText('Group Name')).toBeTruthy();
        expect(screen.getByDisplayValue('')).toBeTruthy(); // Input field
    });
});