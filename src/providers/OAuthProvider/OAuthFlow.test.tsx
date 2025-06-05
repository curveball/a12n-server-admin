import { generateCodeVerifier } from '@badgateway/oauth2-client';
import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import client from '../../config/oauth';
import useOAuth from '../../hooks/useOAuth';
import { OAuthProvider } from './OAuthProvider';

vi.resetAllMocks();

vi.mock('@badgateway/oauth2-client', () => ({
    generateCodeVerifier: vi.fn(() => Promise.resolve('mockedCodeVerifier')),
}));

vi.mock('../../config/oauth', () => ({
    default: {
        getAuthorizeUri: vi.fn(() => Promise.resolve('https://mocked-auth-url.com')),
        getToken: vi.fn(() => Promise.resolve({ access_token: 'mockToken' })),
    },
}));

const navigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(() => navigate),
}));

describe('OAuthProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
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
            expect(vi.mocked(client.authorizationCode.getToken)).toHaveBeenCalled();
        });
    });

    it('handles an invalid auth redirect correctly', async () => {
        vi.mock('../../config/oauth', () => ({
            default: {
                authorizationCode: {
                    getAuthorizeUri: vi.fn(() => Promise.resolve('https://mocked-auth-url.com')),
                    getToken: vi.fn(() => {
                        throw new Error('mocked error');
                    }),
                },
            },
        }));

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
            expect(vi.mocked(client.authorizationCode.getToken)).toHaveBeenCalled();
            expect(navigate).toHaveBeenCalledWith('/404');
        });
    });
});
