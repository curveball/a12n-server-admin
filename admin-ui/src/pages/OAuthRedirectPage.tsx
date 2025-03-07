import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Spinner } from '@radix-ui/themes';

import { useOAuth } from '../lib/OAuthProvider';

const OAuthRedirectPage = () => {
    const { isAuthenticated, handleOAuthRedirect } = useOAuth();

    useEffect(() => {
        if (!isAuthenticated) handleOAuthRedirect();
    }, [isAuthenticated, handleOAuthRedirect]);

    return isAuthenticated ? (
        <Navigate to='/users' />
    ) : (
        <Box
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Spinner size='3' />
        </Box>
    );
};

export default OAuthRedirectPage;
