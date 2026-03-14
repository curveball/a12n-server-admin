/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UserEdit from './UserEdit';
import { useGetUserQuery } from '../../api';
import { ResourceType } from '../../types';

vi.mock('../../api', async () => {
    const actual = await vi.importActual<typeof import('../../api')>('../../api');
    return {
        ...actual,
        useGetUserQuery: vi.fn(),
        useUpdateUserQuery: vi.fn(() => ({ mutateAsync: vi.fn() })),
    };
});
const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('UserEdit', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    const mockUserData = {
        nickname: 'Clark Kent',
        address: {
            streetAddress: ['123 Main St'],
            locality: 'Metropolis',
            postalCode: '12345',
            region: 'NY',
            country: 'US',
        },
        active: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        modifiedAt: '2023-01-02T00:00:00.000Z',
        type: ResourceType.USER,
        privileges: {},
        hasPassword: true,
    };

    it('renders loading state initially', async () => {
        vi.mocked(useGetUserQuery).mockImplementation(() => ({
            data: undefined,
            isLoading: true,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            prefetchUser: vi.fn(),
        }));
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserEdit />
            </QueryClientProvider>,
        );
        expect(await screen.findByText('Loading...')).toBeInTheDocument();
    });

    it('renders user data when available', async () => {
        vi.mocked(useGetUserQuery).mockImplementation(() => ({
            data: mockUserData,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
            isRefetching: false,
            prefetchUser: vi.fn(),
        }));
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserEdit />
            </QueryClientProvider>,
        );
        expect(await screen.findByText('Clark Kent')).toBeInTheDocument();
        expect(await screen.findByText('View and edit user details below')).toBeInTheDocument();
    });

    it('renders error state', async () => {
        vi.mocked(useGetUserQuery).mockImplementation(() => ({
            data: undefined,
            isLoading: false,
            error: new Error('Failed to fetch user'),
            refetch: vi.fn(),
            isRefetching: false,
            prefetchUser: vi.fn(),
        }));
        render(
            <QueryClientProvider client={createQueryClient()}>
                <UserEdit />
            </QueryClientProvider>,
        );
        expect(await screen.findByText('Error: Failed to fetch user')).toBeInTheDocument();
    });
});
