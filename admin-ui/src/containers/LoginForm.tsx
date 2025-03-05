import { generateCodeVerifier } from '@badgateway/oauth2-client';
import { Box, Heading, Button } from '@radix-ui/themes';
import client from '../utils/oauth/client';
import { CODE_VERIFIER_LOCAL_STORAGE_NAME } from '../utils/constants';

const LoginForm = () => {
    const triggerOAuthFlow = async () => {
        const codeVerifier = await generateCodeVerifier();
        localStorage.setItem(CODE_VERIFIER_LOCAL_STORAGE_NAME, codeVerifier);
        document.location = await client.authorizationCode.getAuthorizeUri({
            redirectUri: import.meta.env.VITE_POST_AUTH_REDIRECT_URI,
            codeVerifier,
        });
    };

    return (
        <Box
            style={{
                maxWidth: '600px',
                borderRadius: '25px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--mauve-7)',
                padding: '65px 40px 30px 40px',
            }}
        >
            <Box style={{ textAlign: 'center' }}>
                <Heading
                    style={{
                        fontWeight: '600',
                        fontFamily: 'Matter',
                        fontSize: '38px',
                    }}
                >
                    Log in to the <span style={{ color: '#ab6400' }}>Admin UI</span>
                </Heading>
                <Heading
                    style={{
                        color: 'var(--gray-900)',
                        fontFamily: 'Matter',
                        fontSize: '18px',
                        marginTop: '20px',
                        fontWeight: '400',
                        lineHeight: '24px',
                    }}
                >
                    Click the button below to log back in. Then, please enter your details on the redirected page or
                    reset your password.
                </Heading>
            </Box>

            <Button
                style={{
                    backgroundColor: 'var(--amber-11)',
                    width: '514px',
                    height: '46px',
                    marginTop: '30px',
                    marginBottom: '20px',
                    fontFamily: 'Matter',
                    fontSize: '18px',
                    fontWeight: '500',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
                onClick={() => triggerOAuthFlow()}
            >
                Log In with OAuth
            </Button>
        </Box>
    );
};

export default LoginForm;
