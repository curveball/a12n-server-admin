import { Box, Text, Flex } from '@radix-ui/themes';
import adminLogo from '../assets/icons/admin-ui-logo.svg';
import { LoginForm } from '../containers';

export default function LoginPage() {
    return (
        <Box
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <Flex
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    alignItems: 'center',
                    gap: '12px',
                }}
            >
                <Box style={{ width: '36px', height: '37px', flexShrink: 0 }}>
                    <img
                        src={adminLogo}
                        alt='Admin UI Logo'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <Box>
                    <Text style={{ fontWeight: '500', fontSize: '18px', fontFamily: 'Matter' }}>a12n-server</Text>
                    <Flex style={{ alignItems: 'center', gap: '6px' }}>
                        <Text size='1' style={{ color: '#876850', fontFamily: 'Matter' }}>
                            Admin UI
                        </Text>
                        <Box
                            style={{
                                backgroundColor: 'var(--amber-11)',
                                borderRadius: '4px',
                                padding: '0 4px',
                                fontSize: '11px',
                                color: 'white',
                                fontWeight: '500',
                                fontFamily: 'Matter',
                            }}
                        >
                            v1.0.0
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <LoginForm />
        </Box>
    );
}
