import { Box, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <Box
        style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Heading style={{ fontSize: '40px' }}>404 Page Not Found</Heading>
            <Text style={{ fontSize: '20px', marginTop: '15px' }}>
                Uh Oh! Looks like you got lost! Return to{' '}
                <Link style={{ color: 'var(--amber-11)' }} to='/users'>
                    home?
                </Link>
            </Text>
        </Box>
    </Box>
);

export default NotFoundPage;
