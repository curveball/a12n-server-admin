import { useEffect, useMemo } from 'react';

import { configureInterceptors, ejectInterceptors } from '../config/axios';
import APICore from '../utils/api';
import useOAuth from './useOAuth';
import useToast from './useToast';

const useAxios = () => {
    const { tokens, setTokens, refreshAccessToken } = useOAuth();
    const toast = useToast();

    const api = useMemo(() => new APICore(toast), [toast]);

    useEffect(() => {
        const interceptors = configureInterceptors(api, tokens!, refreshAccessToken);
        return () => ejectInterceptors(api, interceptors);
    }, [api, tokens, setTokens, refreshAccessToken]);

    return api;
};

export default useAxios;
