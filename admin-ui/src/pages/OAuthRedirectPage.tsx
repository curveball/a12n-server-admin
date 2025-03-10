import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Spinner } from '@radix-ui/themes';

import { useOAuth } from '../lib/OAuthProvider';

const OAuthRedirectPage = () => {
    const { isAuthenticated, handleOAuthRedirect } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const processOAuthRedirect = async () => {
            if (!isAuthenticated) {
                const postAuthRedirectPath = await handleOAuthRedirect();
                navigate(postAuthRedirectPath!);
            }
        };
        processOAuthRedirect();
    }, [isAuthenticated, handleOAuthRedirect, navigate]);

    return (
        <Box className='w-screen h-screen flex! flex-row items-center justify-center'>
            <Spinner size='3' />
        </Box>
    );
};

export default OAuthRedirectPage;
