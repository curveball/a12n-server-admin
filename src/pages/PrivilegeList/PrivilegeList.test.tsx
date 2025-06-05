// src/tests/PrivilegeList.test.tsx
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import PrivilegeList from './PrivilegeList';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

// Mock OAuthProvider so that useOAuth returns a dummy token.
vi.mock('../lib/hooks/useOAuth', () => ({
    useOAuth: () => ({ tokens: { accessToken: 'dummy-token' }, isAuthenticated: true }),
}));

// Mock the useAxios hook so that the privileges query returns dummy data.
vi.mock('../lib/hooks/useAxios', () => ({
    default: () => ({
        get: async ({ suffix }: { suffix: string }) => {
            if (suffix === '/privilege') {
                return {
                    _links: {
                        item: [
                            {
                                href: '/privilege/admin',
                                title: 'Full admin privileges on the authentication server',
                            },
                            {
                                href: '/privilege/a12n:principals:list',
                                title: 'Read user, app and group information',
                            },
                        ],
                    },
                    total: 2,
                };
            }
            return {};
        },
    }),
}));

describe.skip('PrivilegeList Page', () => {
    beforeAll(() => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <PrivilegeList />
            </QueryClientProvider>,
        );
    });

    it('renders without crashing', async () => {
        // Wait for the loading state to disappear before checking for content.
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });

        // Check for one piece of dummy data.
        await waitFor(() => {
            expect(screen.getByText(/Full admin privileges on the authentication server/i)).toBeInTheDocument();
        });
    });
});
