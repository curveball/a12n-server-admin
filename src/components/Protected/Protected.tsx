import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../../hooks';
import { CLIENT_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';
import { POST_AUTH_REDIRECT_QUERY_PARAM_NAME } from '../../utils/constants';

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
