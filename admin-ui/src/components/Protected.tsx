import { useOAuth } from '../lib/OAuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useOAuth();
    const { pathname } = useLocation();

    return isAuthenticated ? <>{children}</> : <Navigate to={'/auth/trigger?redirect=' + pathname} />;
};

export default Protected;
