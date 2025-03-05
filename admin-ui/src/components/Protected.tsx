import { useOAuth } from '../lib/OAuthProvider';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useOAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to='/auth/trigger' />;
};

export default Protected;
