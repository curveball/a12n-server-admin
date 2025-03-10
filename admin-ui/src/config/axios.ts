import axios from 'axios';
import { OAuth2Token } from '@badgateway/oauth2-client';
import { formatAuthorizationHeader } from '../utils/helpers/common';
import APICore from '../utils/api';

export const configureInterceptors = (
    api: APICore,
    tokens: OAuth2Token,
    refreshAccessToken: () => Promise<OAuth2Token | undefined>,
) => {
    let refreshOperation: Promise<OAuth2Token | undefined> | null = null;

    const performConditionalRefresh = async (): Promise<string> => {
        if (refreshOperation) {
            const { accessToken } = (await refreshOperation) as OAuth2Token;
            return accessToken;
        }

        refreshOperation = refreshAccessToken();
        const { accessToken } = (await refreshOperation) as OAuth2Token;
        refreshOperation = null;
        return accessToken;
    };

    const requestInterceptor = api.client.interceptors.request.use(
        async (config) => {
            let accessToken = tokens.accessToken;

            if (tokens.expiresAt! < Date.now()) accessToken = await performConditionalRefresh();

            config.headers.Authorization = formatAuthorizationHeader(accessToken);
            return config;
        },
        (error) => Promise.reject(error),
    );

    const responseInterceptor = api.client.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                originalRequest._retry = true;

                const accessToken = await performConditionalRefresh();
                originalRequest.headers.Authorization = formatAuthorizationHeader(accessToken);

                return axios(originalRequest);
            }

            return Promise.reject(error);
        },
    );

    return { requestInterceptor, responseInterceptor };
};

export const ejectInterceptors = (
    api: APICore,
    interceptors: { requestInterceptor: number; responseInterceptor: number },
) => {
    api.client.interceptors.request.eject(interceptors.requestInterceptor);
    api.client.interceptors.response.eject(interceptors.responseInterceptor);
};
