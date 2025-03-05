import { Box, Spinner } from '@radix-ui/themes';
import { useOAuth } from '../lib/OAuthProvider';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoadingPage = () => {
    const { isAuthenticated, triggerOAuthFlow } = useOAuth();

    useEffect(() => {
        if (!isAuthenticated) triggerOAuthFlow();
    });

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

export default LoadingPage;
