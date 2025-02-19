import { Box, Text, Button, Flex, Link } from '@radix-ui/themes';
import adminLogo from '../assets/icons/admin-ui-logo.svg';
import * as Avatar from '@radix-ui/react-avatar';

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
                <Avatar.Root style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                    <Avatar.Image
                        src={adminLogo}
                        alt='Admin UI Logo'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <Avatar.Fallback
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#b78846',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            borderRadius: '50%',
                        }}
                    >
                        AU
                    </Avatar.Fallback>
                </Avatar.Root>
                <Box>
                    <Text style={{ fontWeight: '500', fontSize: '18px' }}>a12n-server</Text>
                    <Flex style={{ alignItems: 'center', gap: '6px' }}>
                        <Text size='1' style={{ color: '#876850' }}>
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
                            }}
                        >
                            v1.0.0
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            <Box
                style={{
                    maxWidth: '600px',
                    width: '90%',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '40px',
                    border: '1px solid #e0e0e0',
                }}
            >
                <Box as='div' style={{ width: '100%', padding: '0 20px' }}>
                    <Button
                        size='3'
                        style={{
                            backgroundColor: '#b78846',
                            width: '100%',
                            marginTop: '10px',
                            cursor: 'pointer',
                            marginBottom: '20px',
                        }}
                    >
                        Log In
                    </Button>

                    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Text size='2' style={{ color: '#666' }}>
                            Don't have an account?{' '}
                            <Link style={{ cursor: 'pointer', color: 'var(--bronze-11)' }}>Sign up here</Link>.
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
