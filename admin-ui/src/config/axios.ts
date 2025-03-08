import axios, { AxiosInstance } from 'axios';
import { OAuth2Token } from '@badgateway/oauth2-client';

import { formatAuthorizationHeader } from '../utils/helpers/common';

type refreshSubscriberCallbackFn = (newAccessToken: string) => void;

export const configureInterceptors = (
    api: AxiosInstance,
    tokens: OAuth2Token,
    refreshAccessToken: () => Promise<OAuth2Token | undefined>,
) => {
    let isRefreshing = false;
    let refreshSubscribers: refreshSubscriberCallbackFn[] = [];

    const onRefreshed = (newAccessToken: string) => {
        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];
    };

    const addRefreshSubscriber = (callback: refreshSubscriberCallbackFn) => {
        refreshSubscribers.push(callback);
    };

    const requestInterceptor = api.interceptors.request.use(
        async (config) => {
            const { accessToken, expiresAt } = tokens;

            if (expiresAt! < Date.now()) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const { accessToken } = (await refreshAccessToken()) as OAuth2Token;
                    isRefreshing = false;

                    onRefreshed(accessToken);
                    config.headers.Authorization = formatAuthorizationHeader(accessToken);
                    return config;
                }

                return new Promise((resolve) => {
                    addRefreshSubscriber((newAccessToken) => {
                        config.headers.Authorization = `Bearer ${newAccessToken}`;
                        resolve(config);
                    });
                });
            }

            config.headers.Authorization = formatAuthorizationHeader(accessToken);
            return config;
        },
        (error) => Promise.reject(error),
    );

    const responseInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                originalRequest._retry = true;
                if (!isRefreshing) {
                    isRefreshing = true;
                    const { accessToken } = (await refreshAccessToken()) as OAuth2Token;
                    isRefreshing = false;

                    onRefreshed(accessToken);
                    originalRequest.headers.Authorization = formatAuthorizationHeader(accessToken);
                    return axios(originalRequest);
                }

                return new Promise((resolve) => {
                    addRefreshSubscriber((newAccessToken) => {
                        originalRequest.headers.Authorization = formatAuthorizationHeader(newAccessToken);
                        resolve(axios(originalRequest));
                    });
                });
            }
            return Promise.reject(error);
        },
    );

    return { requestInterceptor, responseInterceptor };
};

export const ejectInterceptors = (
    api: AxiosInstance,
    interceptors: { requestInterceptor: number; responseInterceptor: number },
) => {
    api.interceptors.request.eject(interceptors.requestInterceptor);
    api.interceptors.response.eject(interceptors.responseInterceptor);
};
