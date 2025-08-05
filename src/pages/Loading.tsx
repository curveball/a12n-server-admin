import { Box, Spinner } from '@radix-ui/themes';

import useOAuthRedirect from '../hooks/useOAuthRedirect';

const Loading = () => {
    const { isLoading } = useOAuthRedirect();

    return isLoading ? (
        <Box className='w-screen h-screen flex! flex-row items-center justify-center'>
            <Spinner size='3' />
        </Box>
    ) : null;
};

export default Loading;
