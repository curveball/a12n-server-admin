import { generateCodeVerifier } from '@badgateway/oauth2-client';
import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import useOAuth from '../../hooks/useOAuth';
import client from './OAuth2Client';
import { OAuthProvider } from './OAuthProvider';

// Only mock generateCodeVerifier
vi.mock('@badgateway/oauth2-client', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as Record<string, unknown>),
        generateCodeVerifier: vi.fn(() => Promise.resolve('mockedCodeVerifier')),
        OAuth2Client: vi.fn(() => ({
            authorizationCode: {
                getAuthorizeUri: vi.fn(() => Promise.resolve('https://mocked-auth-url.com')),
                getToken: vi.fn(() =>
                    Promise.resolve({
                        accessToken: 'mockToken',
                        refreshToken: 'mockRefreshToken',
                        expiresAt: Date.now() + 3600 * 1000,
                    }),
                ),
            },
        })),
    };
});

const navigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(() => navigate),
}));

const originalLocation = vi.mocked(window.location);

beforeAll(() => {
    vi.resetAllMocks();
    originalLocation.href = 'https://localhost:5173';
});

afterAll(() => {
    vi.resetAllMocks();
});

describe('OAuthProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        client.authorizationCode.getAuthorizeUri = vi.fn(() => Promise.resolve('https://mocked-auth-url.com'));
        client.authorizationCode.getToken = vi.fn(() =>
            Promise.resolve({
                accessToken: 'mockToken',
                refreshToken: 'mockRefreshToken',
                expiresAt: Date.now() + 3600 * 1000,
            }),
        );
    });

    it('triggers auth flow correctly', async () => {
        const TestComponent = () => {
            const { triggerOAuthFlow } = useOAuth();

            useEffect(() => {
                triggerOAuthFlow('/test_dir');
            }, [triggerOAuthFlow]);

            return <div>Test</div>;
        };
        render(
            <OAuthProvider>
                <TestComponent />
            </OAuthProvider>,
        );

        await waitFor(() => {
            expect(vi.mocked(generateCodeVerifier)).toHaveBeenCalled();
            expect(vi.mocked(client.authorizationCode.getAuthorizeUri)).toHaveBeenCalled();
        });
    });

    it('handles a valid auth redirect correctly', async () => {
        const TestComponent = () => {
            const { handleOAuthRedirect } = useOAuth();

            useEffect(() => {
                handleOAuthRedirect();
            }, [handleOAuthRedirect]);

            return <div>Test</div>;
        };

        render(
            <OAuthProvider>
                <TestComponent />
            </OAuthProvider>,
        );

        await waitFor(() => {
            expect(client.authorizationCode.getToken).toHaveBeenCalled();
        });
    });

    it('handles an invalid auth redirect correctly', async () => {
        client.authorizationCode.getToken = vi.fn(() => {
            throw new Error('mocked error');
        });

        const TestComponent = () => {
            const { handleOAuthRedirect } = useOAuth();

            useEffect(() => {
                handleOAuthRedirect();
            }, [handleOAuthRedirect]);

            return <div>Test</div>;
        };

        render(
            <OAuthProvider>
                <TestComponent />
            </OAuthProvider>,
        );

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/404');
        });
    });
});
