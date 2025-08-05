import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useOAuth, useQueryParams } from '../hooks';
import { CLIENT_ROUTES, SERVER_ROUTES } from '../routes';
import Loading from './Loading';

const OAuthTriggerPage = () => {
    const { isAuthenticated, triggerOAuthFlow } = useOAuth();
    const redirectPath = useQueryParams('redirect');
    const [postAuthRedirectPath, setPostAuthRedirectPath] = useState<string>(redirectPath || CLIENT_ROUTES.USERS_TABLE);

    useEffect(() => {
        if (!isAuthenticated) {
            setPostAuthRedirectPath(import.meta.env.VITE_AUTH_SERVER_URL + SERVER_ROUTES.LOGIN);
            triggerOAuthFlow(postAuthRedirectPath);
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Navigate to={postAuthRedirectPath} /> : <Loading />;
};

export default OAuthTriggerPage;
