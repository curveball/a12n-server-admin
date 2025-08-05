import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOAuth from './useOAuth';

/**
 * Custom hook to handle OAuth redirect processing
 * Manages the OAuth callback flow and navigation after successful authentication
 */
const useOAuthRedirect = () => {
    const { isAuthenticated, handleOAuthRedirect, setTokens } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const processOAuthRedirect = async () => {
            // Only process redirect if user is not already authenticated
            if (!isAuthenticated) {
                try {
                    // Clear any existing tokens before processing redirect
                    setTokens(null);

                    // Handle the OAuth redirect and get the post-auth redirect path
                    const postAuthRedirectPath = await handleOAuthRedirect();

                    // Navigate to the intended destination after authentication
                    if (postAuthRedirectPath) {
                        navigate(postAuthRedirectPath);
                    }
                } catch (error) {
                    console.error('🔴 OAuth redirect processing failed:', error);
                    // Could add error handling/navigation to error page here
                }
            }
        };

        processOAuthRedirect();
    }, [isAuthenticated, handleOAuthRedirect, navigate, setTokens]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(true);
        }
        setLoading(false);
    }, [isAuthenticated]);

    return {
        isLoading,
    };
};

export default useOAuthRedirect;
