// axios.ts

import axios from 'axios';
import { OAuth2Token } from '@badgateway/oauth2-client';
import client from '../oauth/client';
import { isTokenExpired } from './tokenExpiry';

let isRefreshing = false;
let refreshPromise: Promise<OAuth2Token> | null = null;

const axiosInstance = axios.create({});

export function setupAxiosInterceptors(getTokens: () => OAuth2Token | null, setTokens: (tokens: OAuth2Token) => void) {
    axiosInstance.interceptors.request.use(
        async (config) => {
            const tokens = getTokens();

            if (!tokens) return config;

            if (isTokenExpired(tokens)) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    refreshPromise = client
                        .refreshToken(tokens)
                        .then((newTokens: OAuth2Token) => {
                            setTokens(newTokens);
                            return newTokens;
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                }

                const newTokens = await refreshPromise;
                if (newTokens) {
                    config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                }
            } else {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
}

export default axiosInstance;
