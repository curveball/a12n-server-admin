import { createContext, useContext, useState } from 'react';
import { generateCodeVerifier, OAuth2Token } from '@badgateway/oauth2-client';
import { useNavigate } from 'react-router-dom';

import client from '../utils/oauth/client';
import { AUTHORIZATION_CODE_QUERY_PARAM_NAME, CODE_VERIFIER_LOCAL_STORAGE_NAME } from '../constants';

type OAuthContextType = {
    tokens: OAuth2Token | null;
    isAuthenticated: boolean;
    setTokens: React.Dispatch<React.SetStateAction<OAuth2Token | null>>;
    triggerOAuthFlow: () => Promise<void>;
    handleOAuthRedirect: () => Promise<void>;
};

const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokens, setTokens] = useState<OAuth2Token | null>(null);
    const navigate = useNavigate();

    const triggerOAuthFlow = async () => {
        const codeVerifier = await generateCodeVerifier();
        localStorage.setItem(CODE_VERIFIER_LOCAL_STORAGE_NAME, codeVerifier);
        document.location = await client.authorizationCode.getAuthorizeUri({
            redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
            codeVerifier,
        });
    };

    const handleOAuthRedirect = async () => {
        try {
            const codeVerifier = localStorage.getItem(CODE_VERIFIER_LOCAL_STORAGE_NAME)!;
            const searchParams = new URLSearchParams(window.location.search);
            const oAuth2Token = await client.authorizationCode.getToken({
                code: searchParams.get(AUTHORIZATION_CODE_QUERY_PARAM_NAME)!,
                redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
                codeVerifier,
            });
            setTokens(oAuth2Token);
            setIsAuthenticated(true);
        } catch {
            navigate('/404');
        }
    };

    return (
        <OAuthContext.Provider value={{ isAuthenticated, tokens, setTokens, triggerOAuthFlow, handleOAuthRedirect }}>
            {children}
        </OAuthContext.Provider>
    );
};

export const useOAuth = (): OAuthContextType => {
    const context = useContext(OAuthContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
