/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import * as useOAuth from '../../hooks/useOAuth';
import { CLIENT_ROUTES } from '../../types/models';
import Protected from './Protected';

vi.resetAllMocks();

vi.mock('@badgateway/oauth2-client', () =>
    vi.fn().mockReturnValue({
        generateCodeVerifier: vi.fn(),
        generateCodeChallenge: vi.fn(),
        client: {
            authorizationCode: {
                getAuthorizeUri: vi.fn(),
                getToken: vi.fn(),
            },
        },
    }),
);

// Patch window.location to avoid navigation errors.
beforeAll(() => {
    Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: {
            href: 'http://localhost',
            assign: vi.fn(),
            replace: vi.fn(),
        },
    });
});

describe('Protected Component', () => {
    // Mock the useOAuth hook.
    vi.mock('../../hooks/useOAuth', () => ({
        default: vi.fn().mockReturnValue({
            isAuthenticated: true,
            tokens: { accessToken: 'test-token', tokenType: 'Bearer' },
        }),
    }));

    it('renders children when authenticated', () => {
        // Simulate an authenticated user.
        vi.spyOn(useOAuth, 'default').mockReturnValue({
            isAuthenticated: true,
            tokens: { accessToken: 'test-token', expiresAt: 0, refreshToken: 'test-refresh-token' },
            setTokens: vi.fn(),
            triggerOAuthFlow: vi.fn(),
            handleOAuthRedirect: vi.fn(),
            refreshAccessToken: vi.fn(),
        }) as any;

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path='/protected'
                        element={
                            <Protected>
                                <div>Protected Content</div>
                            </Protected>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        );

        // Use toBeTruthy instead of toBeInTheDocument.
        const content = screen.getByText(/Protected Content/i);
        expect(content).toBeTruthy();
    });

    it('redirects to auth trigger when not authenticated', () => {
        // Simulate a non-authenticated user.
        vi.spyOn(useOAuth, 'default').mockReturnValue({
            isAuthenticated: false,
            tokens: null,
            setTokens: vi.fn(),
            triggerOAuthFlow: vi.fn(),
            handleOAuthRedirect: vi.fn(),
            refreshAccessToken: vi.fn(),
        }) as any;

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path='/protected'
                        element={
                            <Protected>
                                <div>Protected Content</div>
                            </Protected>
                        }
                    />
                    <Route path={CLIENT_ROUTES.AUTH_TRIGGER} element={<div>Auth Trigger Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        // Verify that the auth trigger page is rendered.
        const authPage = screen.getByText(/Auth Trigger Page/i);
        expect(authPage).toBeTruthy();
    });
});
