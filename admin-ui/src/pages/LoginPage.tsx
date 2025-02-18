import { Box, Text, Button, Flex, TextField as TextFieldRoot, Link } from '@radix-ui/themes';
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
                <Box style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Text
                        as='p'
                        size='7'
                        style={{
                            marginBottom: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Log in to the <span style={{ color: '#ab6400' }}>Admin UI</span>
                    </Text>
                    <Text as='p' size='3' style={{ color: '#555' }}>
                        Enter in your details below to log back in. If you forgot your password, just click the link at
                        the bottom of the page.
                    </Text>
                </Box>

                <Box as='div' style={{ width: '100%', padding: '0 20px' }}>
                    <Box style={{ marginBottom: '20px' }}>
                        <Text as='label' size='2' style={{ display: 'block', marginBottom: '8px', textAlign: 'left' }}>
                            Email address<span style={{ color: 'red' }}>*</span>
                        </Text>
                        <TextFieldRoot.Root size='3' placeholder='clark.kent@superman.com' style={{ width: '100%' }} />
                    </Box>

                    <Box style={{ marginBottom: '20px' }}>
                        <Text as='label' size='2' style={{ display: 'block', marginBottom: '8px', textAlign: 'left' }}>
                            Password<span style={{ color: 'red' }}>*</span>
                        </Text>
                        <TextFieldRoot.Root
                            type='password'
                            size='3'
                            placeholder='••••••••••••••••••••••••••••••'
                            style={{ width: '100%' }}
                        >
                            <TextFieldRoot.Slot side='right'>
                                <Button
                                    size='1'
                                    style={{
                                        backgroundColor: '#b78846',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Show
                                </Button>
                            </TextFieldRoot.Slot>
                        </TextFieldRoot.Root>
                    </Box>

                    <Link size='2' style={{ color: '#666', cursor: 'pointer' }}>
                        <Box style={{ textAlign: 'right', color: 'var(--amber-12)', marginBottom: '20px' }}>
                            Forgot your password?
                        </Box>
                    </Link>

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

                    <Flex style={{ margin: '20px 0', alignItems: 'center' }}>
                        <Box style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }} />
                        <Box style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }} />
                    </Flex>

                    <Button
                        size='3'
                        variant='outline'
                        style={{
                            width: '100%',
                            color: '#666',
                            cursor: 'pointer',
                            backgroundColor: 'var(--bronze-11)',
                            marginBottom: '20px',
                        }}
                    >
                        <Text style={{ color: 'white' }}>Log in with OAuth</Text>
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
