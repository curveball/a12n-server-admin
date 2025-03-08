import { Box, Spinner } from '@radix-ui/themes';
import { useOAuth } from '../lib/OAuthProvider';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CLIENT_ROUTES, POST_AUTH_REDIRECT_QUERY_PARAM_NAME } from '../utils/constants';
import { useQueryParams } from '../utils/hooks';

const OAuthTriggerPage = () => {
    const { isAuthenticated, triggerOAuthFlow } = useOAuth();
    const postAuthRedirectPath = useQueryParams(POST_AUTH_REDIRECT_QUERY_PARAM_NAME) || CLIENT_ROUTES.USERS_TABLE;

    useEffect(() => {
        if (!isAuthenticated) triggerOAuthFlow(postAuthRedirectPath);
    });

    return isAuthenticated ? (
        <Navigate to={CLIENT_ROUTES.USERS_TABLE} />
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

export default OAuthTriggerPage;
