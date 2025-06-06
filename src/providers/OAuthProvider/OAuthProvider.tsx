import { generateCodeVerifier, OAuth2Token } from '@badgateway/oauth2-client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OAuthContext } from '../../hooks/useOAuth';
import {
    AUTHORIZATION_CODE_QUERY_PARAM_NAME,
    CLIENT_ROUTES,
    CODE_VERIFIER_LOCAL_STORAGE_NAME,
    POST_AUTH_REDIRECT_PATH_LOCAL_STORAGE_NAME,
} from '../../utils/constants';
import client from './OAuth2Client';

export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokens, setTokens] = useState<OAuth2Token | null>(null);
    const navigate = useNavigate();

    const triggerOAuthFlow = async (postAuthRedirectPath: string) => {
        const codeVerifier = await generateCodeVerifier();
        localStorage.setItem(CODE_VERIFIER_LOCAL_STORAGE_NAME, codeVerifier);
        localStorage.setItem(POST_AUTH_REDIRECT_PATH_LOCAL_STORAGE_NAME, postAuthRedirectPath);

        document.location = await client.authorizationCode.getAuthorizeUri({
            redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
            codeVerifier,
            state: postAuthRedirectPath,
        });
    };

    const handleOAuthRedirect = async () => {
        try {
            const codeVerifier = localStorage.getItem(CODE_VERIFIER_LOCAL_STORAGE_NAME)!;
            const postAuthRedirectPath = localStorage.getItem(POST_AUTH_REDIRECT_PATH_LOCAL_STORAGE_NAME)!;
            const searchParams = new URLSearchParams(window.location.search);

            const oAuth2Token = await client.authorizationCode.getToken({
                code: searchParams.get(AUTHORIZATION_CODE_QUERY_PARAM_NAME)!,
                redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
                codeVerifier,
                state: postAuthRedirectPath,
            });

            localStorage.removeItem(CODE_VERIFIER_LOCAL_STORAGE_NAME);
            localStorage.removeItem(POST_AUTH_REDIRECT_PATH_LOCAL_STORAGE_NAME);
            setTokens(oAuth2Token);
            setIsAuthenticated(true);

            return postAuthRedirectPath;
        } catch (err) {
            console.error(err);
            navigate('/404');
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
