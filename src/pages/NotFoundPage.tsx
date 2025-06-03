import { Box, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '../utils/constants';

const NotFoundPage = () => (
    <Box className='w-screen h-screen flex! flex-row items-center justify-center'>
        <Box className='flex! flex-col items-center'>
            <Heading className='text-[40px]!'>404 Page Not Found</Heading>
            <Text className='text-2xl mt-[15px]!'>
                Uh Oh! Looks like you got lost! Return to{' '}
                <Link className='text-amber-800' to={CLIENT_ROUTES.USERS_TABLE}>
                    home?
                </Link>
            </Text>
        </Box>
    </Box>
);

export default NotFoundPage;
