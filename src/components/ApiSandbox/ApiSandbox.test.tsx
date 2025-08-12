/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { withResizeObserver } from '../../tests/setup';
import ApiSandbox from './ApiSandbox';

vi.mock('../../hooks/useOAuth', () => ({
    default: () => ({
        tokens: { accessToken: 'test-token', tokenType: 'Bearer' },
        isAuthenticated: true,
        setTokens: vi.fn(),
        triggerOAuthFlow: vi.fn(),
        handleOAuthRedirect: vi.fn(),
        refreshAccessToken: vi.fn(),
    }),
}));

vi.mock('../../hooks/useSandboxQueries', () => ({
    default: () => ({
        refetch: vi.fn(),
        method: 'GET',
        requestRoute: '/',
        setRequestRoute: vi.fn(),
        isFetching: false,
        data: [
            {
                _links: {
                    self: {},
                },
            },
        ],
        fullUrl: 'http://localhost:8531/',
    }),
}));

vi.mock('../../hooks/useServerStats', () => ({
    useServerStats: vi.fn(),
}));

vi.mock(import('../../hooks/useAxios'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAxios: vi.fn(),
    };
});

vi.mock('../../utils/queries/users', () => ({
    getAllUsers: (_api: unknown) => ({
        queryKey: ['users'],
        queryFn: async () =>
            Promise.resolve([
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            ]),
    }),
}));

if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            writeText: async (_text: string) => Promise.resolve(),
            readText: async () => Promise.resolve(''),
        },
        writable: true,
    });
} else {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            ...navigator.clipboard,
            writeText: async (_text: string) => Promise.resolve(),
        },
        writable: true,
    });
}

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: 1 } },
    });

describe('ApiSandbox Tests', () => {
    beforeAll(() => {
        withResizeObserver();
    });

    beforeEach(() => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <ApiSandbox />
            </QueryClientProvider>,
        );
    });

    afterEach(() => {
        vi.resetAllMocks();
        cleanup();
    });

    it('renders ApiSandbox with default requested URL', async () => {
        expect(screen.getByTestId('request-url')).toHaveTextContent('http://localhost:8531/');
        expect(screen.getByRole('button', { name: /curl/i })).toBeInTheDocument();
        expect(screen.getByTestId('code-block-content')).toHaveTextContent('curl -X GET "http://localhost:8531/"');
    });

    it('updates the request URL when the user selects the /users route', async () => {
        const select = screen.getByTestId('selection-trigger');
        await fireEvent.change(select, { target: { value: '/users' } });
        expect(screen.getByTestId('request-url')).toHaveTextContent('http://localhost:8531/users');
    });

    it('copies snippet text to clipboard when the Copy button is clicked', async () => {
        const writeTextMock = vi.fn(() => Promise.resolve());
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: writeTextMock,
            },
            writable: true,
        });

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        await waitFor(() => {
            expect(writeTextMock).toHaveBeenCalled();
        });
    });

    it('renders a Response section with a heading', async () => {
        expect(screen.getByTestId('response-details-heading')).toBeInTheDocument();
    });

    it('snippet container contains "Bearer test-token"', async () => {
        await waitFor(() => {
            const bearerInstances = screen.queryAllByText(/Bearer test-token/i);
            expect(bearerInstances.length).toBeGreaterThan(0);
        });
    });
});
