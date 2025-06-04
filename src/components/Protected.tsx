import { useOAuth } from '../lib';
import { Navigate, useLocation } from 'react-router-dom';
import { formatAPIPath } from '../utils/helpers/common';
import { CLIENT_ROUTES, POST_AUTH_REDIRECT_QUERY_PARAM_NAME } from '../utils/constants';

const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useOAuth();
    const { pathname } = useLocation();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to={formatAPIPath([CLIENT_ROUTES.AUTH_TRIGGER], { [POST_AUTH_REDIRECT_QUERY_PARAM_NAME]: pathname })}
        />
    );
};

export default Protected;
