import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../hooks';
import { CLIENT_ROUTES, POST_AUTH_REDIRECT_QUERY_PARAM_NAME } from '../utils/constants';
import { formatAPIPath } from '../utils/helpers/common';

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
