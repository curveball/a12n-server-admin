// Protected.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Protected from '../components/Protected';
import { CLIENT_ROUTES } from '../utils/constants';
import { vi } from 'vitest';

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
import { useOAuth } from '../lib/OAuthProvider';
vi.mock('../lib/OAuthProvider', () => ({
  useOAuth: vi.fn(),
}));

describe('Protected Component', () => {
  it('renders children when authenticated', () => {
    // Simulate an authenticated user.
    (useOAuth as any).mockReturnValue({ isAuthenticated: true });
    
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <Protected>
                <div>Protected Content</div>
              </Protected>
            }
          />
        </Routes>
      </MemoryRouter>
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
            path="/protected"
            element={
              <Protected>
                <div>Protected Content</div>
              </Protected>
            }
          />
          <Route path={CLIENT_ROUTES.AUTH_TRIGGER} element={<div>Auth Trigger Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    
    // Verify that the auth trigger page is rendered.
    const authPage = screen.getByText(/Auth Trigger Page/i);
    expect(authPage).toBeTruthy();
  });
});