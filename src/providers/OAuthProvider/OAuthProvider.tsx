import { generateCodeVerifier, OAuth2Token } from '@badgateway/oauth2-client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OAuthContext } from '../../hooks/useOAuth';
import { CLIENT_ROUTES } from '../../routes';
import client from './OAuth2Client';

export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokens, setTokens] = useState<OAuth2Token | null>(null);
    const navigate = useNavigate();

    const triggerOAuthFlow = async (postAuthRedirectPath: string) => {
        const codeVerifier = await generateCodeVerifier();
        localStorage.setItem('a12n_ADMIN_UI_CODE_VERIFIER', codeVerifier);
        localStorage.setItem('a12n_ADMIN_UI_POST_AUTH_REDIRECT_PATH', postAuthRedirectPath);

        document.location = await client.authorizationCode.getAuthorizeUri({
            redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
            codeVerifier,
            state: postAuthRedirectPath,
        });
    };

    const handleOAuthRedirect = async () => {
        try {
            const codeVerifier = localStorage.getItem('a12n_ADMIN_UI_CODE_VERIFIER')!;
            const postAuthRedirectPath = localStorage.getItem('a12n_ADMIN_UI_POST_AUTH_REDIRECT_PATH')!;
            const searchParams = new URLSearchParams(window.location.search);

            const oAuth2Token = await client.authorizationCode.getToken({
                code: searchParams.get('code')!,
                redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
                codeVerifier,
                state: postAuthRedirectPath,
            });

            localStorage.removeItem('a12n_ADMIN_UI_CODE_VERIFIER');
            localStorage.removeItem('a12n_ADMIN_UI_POST_AUTH_REDIRECT_PATH');
            setTokens(oAuth2Token);
            setIsAuthenticated(true);

            return postAuthRedirectPath;
        } catch (err) {
            setTokens(null);
            setIsAuthenticated(false);
            console.error(err);
            navigate(CLIENT_ROUTES.NOT_FOUND);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const newTokens = await client.refreshToken(tokens!);
            setTokens(newTokens);
            return newTokens;
        } catch (err) {
            console.error(err);
            navigate(CLIENT_ROUTES.AUTH_TRIGGER);
        }
    };

    return (
        <OAuthContext.Provider
            value={{ isAuthenticated, tokens, setTokens, triggerOAuthFlow, handleOAuthRedirect, refreshAccessToken }}
        >
            {children}
        </OAuthContext.Provider>
    );
};
