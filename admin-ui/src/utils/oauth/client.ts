import { OAuth2Client } from '@badgateway/oauth2-client';

const client = new OAuth2Client({
    server: import.meta.env.VITE_SERVER_URL,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authorizationEndpoint: '/authorize',
});

export default client;
