import { useEffect, useMemo } from 'react';
import axios from 'axios';

import { useOAuth } from '../../lib/OAuthProvider';
import { configureInterceptors, ejectInterceptors } from '../../config/axios';

export const useAxios = () => {
    const { tokens, setTokens, refreshAccessToken } = useOAuth();

    const api = useMemo(() => axios.create({ baseURL: import.meta.env.VITE_SERVER_URL }), []);

    useEffect(() => {
        const interceptors = configureInterceptors(api, tokens!, refreshAccessToken);
        return () => ejectInterceptors(api, interceptors);
    }, [api, tokens, setTokens, refreshAccessToken]);

    return api;
};
