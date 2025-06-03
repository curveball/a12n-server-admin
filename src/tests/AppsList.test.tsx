import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import AppList from '../pages/AppList';

const useQueryMock = vi.fn();
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query');
    return {
        ...actual,
        useQuery: (...args: any[]) => useQueryMock(...args),
    };
});

const mockUseOAuth = vi.fn();
vi.mock('../lib/OAuthProvider', () => ({
    useOAuth: () => mockUseOAuth(),
}));

vi.mock('../lib/useAxios', () => ({
    useAxios: () => ({}),
}));

const mockAppsQuery = (api: any) => ({
    queryKey: ['apps'],
    queryFn: async () => Promise.resolve({ _embedded: { item: [{ id: 1, name: 'App One' }] } }),
});
vi.mock('../utils/queries/apps', () => ({
    getAllApps: (api: any) => mockAppsQuery(api),
}));

vi.mock('../components/TableList', () => ({
    __esModule: true,
    default: ({ data, itemName, onDelete }: any) => (
        <div data-testid='table-list'>
            {itemName} - {JSON.stringify(data)}
            <button role='button' onClick={onDelete}>
                copy
            </button>
        </div>
    ),
}));

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('AppList Page', () => {
    beforeEach(() => {
        useQueryMock.mockReset();
        mockUseOAuth.mockReset();
    });

    const renderAppList = () => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <AppList />
            </QueryClientProvider>,
        );
    };

    it('shows loading state', () => {
        mockUseOAuth.mockReturnValue({ tokens: { accessToken: 'test-token' } });
        useQueryMock.mockReturnValue({ data: null, isLoading: true, error: null });
        renderAppList();
        expect(screen.getByText(/Loading/i)).toBeTruthy();
    });

    it('shows error state', () => {
        const errorMessage = 'Something went wrong';
        mockUseOAuth.mockReturnValue({ tokens: { accessToken: 'test-token' } });
        useQueryMock.mockReturnValue({ data: null, isLoading: false, error: { message: errorMessage } });
        renderAppList();
        expect(screen.getByText(new RegExp(`Error: ${errorMessage}`, 'i'))).toBeTruthy();
    });

    it('renders TableList with data when loaded', async () => {
        const testData = { _embedded: { item: [{ id: 1, name: 'App One' }] } };
        mockUseOAuth.mockReturnValue({ tokens: { accessToken: 'test-token' } });
        useQueryMock.mockReturnValue({ data: testData, isLoading: false, error: null });
        renderAppList();
        await waitFor(() => {
            const tableList = screen.getByTestId('table-list');
            expect(tableList).toBeTruthy();
            expect(tableList.textContent).toContain('"id":1');
            expect(tableList.textContent?.toLowerCase()).toContain('app');
        });
    });

    it('renders empty TableList when no tokens', async () => {
        mockUseOAuth.mockReturnValue({
            tokens: null,
            isAuthenticated: false,
            setTokens: vi.fn(),
            triggerOAuthFlow: vi.fn(),
            handleOAuthRedirect: vi.fn(),
            refreshAccessTokens: vi.fn(),
        });
        useQueryMock.mockReturnValue({ data: [], isLoading: false, error: null });
        renderAppList();
        await waitFor(() => {
            const tableList = screen.getByTestId('table-list');
            expect(tableList).toBeTruthy();
            expect(tableList.textContent).toContain('[]');
        });
    });
});
