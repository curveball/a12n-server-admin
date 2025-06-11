import APICore from '../core';

const ejectInterceptors = (api: APICore, interceptors: { requestInterceptor: number; responseInterceptor: number }) => {
    api.client.interceptors.request.eject(interceptors.requestInterceptor);
    api.client.interceptors.response.eject(interceptors.responseInterceptor);
};

export default ejectInterceptors;
