// /axios/tokenExpiry.ts

import { OAuth2Token } from "@badgateway/oauth2-client";

export function isTokenExpired(tokens: OAuth2Token): boolean {
    return Date.now() >= (tokens.expiresAt ?? 0);
}