/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import useOAuth from '../../hooks/useOAuth';
import { CLIENT_ROUTES } from '../../utils/constants';
import Protected from './Protected';

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

// Mock the useOAuth hook.
vi.mock('../hooks/useOAuth', () => ({
    default: vi.fn().mockReturnValue({
        isAuthenticated: true,
        tokens: { accessToken: 'test-token', tokenType: 'Bearer' },
    }),
}));

describe('Protected Component', () => {
    it('renders children when authenticated', () => {
        // Simulate an authenticated user.
        (useOAuth as any).mockReturnValue({ isAuthenticated: true });

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
        (useOAuth as any).mockReturnValue({ isAuthenticated: false });

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
