import { Box, Spinner } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useOAuth, useQueryParams } from '../hooks';
import { CLIENT_ROUTES, SERVER_ROUTES } from '../routes';

const OAuthTriggerPage = () => {
    const { isAuthenticated, triggerOAuthFlow } = useOAuth();
    const [postAuthRedirectPath, setPostAuthRedirectPath] = useState<string>(
        useQueryParams('redirect') || CLIENT_ROUTES.USERS_TABLE,
    );

    useEffect(() => {
        if (isAuthenticated) {
            setPostAuthRedirectPath(useQueryParams('redirect') || CLIENT_ROUTES.USERS_TABLE);
        }
        setPostAuthRedirectPath(import.meta.env.VITE_AUTH_SERVER_URL + SERVER_ROUTES.LOGIN);
        triggerOAuthFlow(postAuthRedirectPath);
    }, [isAuthenticated]);

    return isAuthenticated ? (
        <Navigate to={postAuthRedirectPath} />
    ) : (
        <Box className='w-screen h-screen flex! flex-row items-center justify-center'>
            <Spinner size='3' />
        </Box>
    );
};

export default OAuthTriggerPage;
