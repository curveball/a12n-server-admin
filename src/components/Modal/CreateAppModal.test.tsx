/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateAppModal from '../../components/Modal/CreateAppModal';

// Mock the dependencies
vi.mock('../../api', () => ({
    useCreateAppQuery: () => ({
        mutate: vi.fn(),
        isPending: false,
    }),
}));

vi.mock('../../hooks', () => ({
    useAxios: () => ({}),
    useFormValidation: () => ({
        formState: { appName: '', appURL: '' },
        errors: {},
        handleInputChange: vi.fn(),
        isFormValid: () => true,
    }),
}));

describe('CreateAppModal', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the modal when open', () => {
        render(<CreateAppModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('Create App')).toBeInTheDocument();
        expect(screen.getByText('Enter in details below to create a new app')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('My App')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<CreateAppModal isOpen={false} onClose={mockOnClose} />);

        expect(screen.queryByText('Create App')).not.toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(<CreateAppModal isOpen={true} onClose={mockOnClose} />);

        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
