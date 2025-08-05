import { Navigate, useLocation } from 'react-router-dom';
import { useOAuth } from '../../hooks';
import { CLIENT_ROUTES } from '../../routes';
import { formatAPIPath } from '../../utils';

const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useOAuth();
    const { pathname } = useLocation();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to={formatAPIPath([CLIENT_ROUTES.AUTH_TRIGGER], { redirect: pathname })} />
    );
};

export default Protected;
