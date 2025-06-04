import { OAuth2Token } from '@badgateway/oauth2-client';
import { createContext, useContext } from 'react';

type OAuthContextType = {
    tokens?: OAuth2Token | null;
    isAuthenticated: boolean;
    setTokens: React.Dispatch<React.SetStateAction<OAuth2Token | null>>;
    triggerOAuthFlow: (postAuthRedirectPath: string) => Promise<void>;
    handleOAuthRedirect: () => Promise<string | undefined>;
    refreshAccessToken: () => Promise<OAuth2Token | undefined>;
};

export const OAuthContext = createContext<OAuthContextType>({
    tokens: {
        accessToken: '',
        refreshToken: '',
        expiresAt: 0,
    },
    isAuthenticated: false,
    setTokens: () => {},
    triggerOAuthFlow: () => Promise.resolve(),
    handleOAuthRedirect: () => Promise.resolve(undefined),
    refreshAccessToken: () => Promise.resolve(undefined),
});

const useOAuth = (): OAuthContextType => {
    const context = useContext<OAuthContextType>(OAuthContext);
    if (!context) {
        throw new Error('useOAuth must be used within a OAuthProvider');
    }
    return context;
};

export default useOAuth;
