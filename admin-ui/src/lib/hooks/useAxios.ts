import { useEffect, useMemo } from 'react';

import { useOAuth } from '../';
import { configureInterceptors, ejectInterceptors } from '../../config/axios';
import useToast from './useToast';
import APICore from '../../utils/api';

const useAxios = () => {
    const { tokens, setTokens, refreshAccessToken } = useOAuth();
    const toast = useToast();

    const api = useMemo(() => new APICore(toast), []);

    useEffect(() => {
        const interceptors = configureInterceptors(api, tokens!, refreshAccessToken);
        return () => ejectInterceptors(api, interceptors);
    }, [api, tokens, setTokens, refreshAccessToken]);

    return api;
};

export default useAxios;
