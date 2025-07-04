import { Box, Spinner } from '@radix-ui/themes';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useOAuth, useQueryParams } from '../hooks';
import { CLIENT_ROUTES } from '../routes';

const OAuthTriggerPage = () => {
    const { isAuthenticated, triggerOAuthFlow } = useOAuth();
    const postAuthRedirectPath = useQueryParams('redirect') || CLIENT_ROUTES.USERS_TABLE;

    useEffect(() => {
        if (!isAuthenticated) triggerOAuthFlow(postAuthRedirectPath);
    });

    return isAuthenticated ? (
        <Navigate to={CLIENT_ROUTES.USERS_TABLE} />
    ) : (
        <Box className='w-screen h-screen flex! flex-row items-center justify-center'>
            <Spinner size='3' />
        </Box>
    );
};

export default OAuthTriggerPage;
