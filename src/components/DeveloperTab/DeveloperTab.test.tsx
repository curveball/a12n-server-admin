import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import DeveloperTabComponent from './DeveloperTab';

afterEach(() => {
    cleanup();
});

vi.mock('../../lib/hooks/useOAuth', () => ({
    default: () => ({
        tokens: { accessToken: 'test-token' },
        isAuthenticated: true,
        setTokens: vi.fn(),
        triggerOAuthFlow: vi.fn(),
        handleOAuthRedirect: vi.fn(),
        refreshAccessToken: vi.fn(),
    }),
}));

vi.mock(import('../../hooks/useAxios'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAxios: vi.fn(),
    };
});

vi.mock('../../utils/queries/users', () => ({
    getAllUsers: (api: unknown) => ({
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
            writeText: async (text: string) => Promise.resolve(),
            readText: async () => Promise.resolve(''),
        },
        writable: true,
    });
} else {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            ...navigator.clipboard,
            writeText: async (text: string) => Promise.resolve(),
        },
        writable: true,
    });
}

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

describe('Developer Tab Tests', () => {
    beforeEach(() => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <DeveloperTabComponent
                    queryOptions={{ queryKey: ['users'], queryFn: () => Promise.resolve([]) }}
                    fullUrl='http://localhost:8531/user?embed=item'
                />
            </QueryClientProvider>,
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    it('renders DeveloperTabComponent with default snippet (curl) and shows empty data response', async () => {
        expect(screen.getByTestId('request-details-heading')).toBeInTheDocument();
        expect(screen.getByText('http://localhost:8531/user?embed=item')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /curl/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('[]')).toBeInTheDocument();
        });
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
