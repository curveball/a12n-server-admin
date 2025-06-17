import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DEFAULT_TOAST_MESSAGES, ToastFns } from '../hooks/useToast';
import {
    APICollectionResponse,
    APIQueryParams,
    APIRequestBody,
    APIResourceResponse,
    APIResponseToastMessages,
    MutationRequestParams,
    QueryRequestParams,
} from '../types';
import { formatAPIPath } from '../utils';

export enum HTTP_METHODS {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}
class APICore {
    client: AxiosInstance;
    #toast: ToastFns;

    constructor(toastFn: ToastFns) {
        this.#toast = toastFn;
        this.client = axios.create({ baseURL: import.meta.env.VITE_AUTH_SERVER_URL });
    }

    get = ({
        suffix,
        params,
        toastMessages,
        onError,
    }: QueryRequestParams): Promise<APICollectionResponse | APIResourceResponse | void> =>
        this.#performHTTPRequest({
            method: HTTP_METHODS.GET,
            suffix,
            params,
            toastMessages,
            onError,
        });

    post = ({
        suffix,
        body,
        params,
        toastMessages,
        onError,
    }: MutationRequestParams): Promise<APIResourceResponse | void> =>
        this.#performHTTPRequest({
            method: HTTP_METHODS.POST,
            suffix,
            body,
            params,
            toastMessages,
            onError,
        });

    put = ({
        suffix,
        body,
        params,
        toastMessages,
        onError,
    }: MutationRequestParams): Promise<APIResourceResponse | void> =>
        this.#performHTTPRequest({
            method: HTTP_METHODS.PUT,
            suffix,
            body,
            params,
            toastMessages,
            onError,
        });

    patch = ({
        suffix,
        body,
        params,
        toastMessages,
        onError,
    }: MutationRequestParams): Promise<APIResourceResponse | void> =>
        this.#performHTTPRequest({
            method: HTTP_METHODS.PATCH,
            suffix,
            body,
            params,
            toastMessages,
            onError,
        });

    remove = ({ suffix, params, toastMessages, onError }: QueryRequestParams): Promise<APIResourceResponse | void> =>
        this.#performHTTPRequest({
            method: HTTP_METHODS.DELETE,
            suffix,
            params,
            toastMessages,
            onError,
        });

    #performHTTPRequest = async ({
        method,
        suffix = '',
        body = {},
        params,
        toastMessages = {},
        onError,
    }: {
        method: HTTP_METHODS;
        suffix?: string;
        body?: APIRequestBody;
        params?: APIQueryParams;
        toastMessages?: APIResponseToastMessages;
        onError?: (error: AxiosError) => void;
    }): Promise<APIResourceResponse | APICollectionResponse | void> => {
        try {
            const url = formatAPIPath([suffix], params);
            const config: AxiosRequestConfig = { method, url, data: body, params };
            const response: AxiosResponse = await this.client(config);

            const { status, title, description } =
                response.status in toastMessages ? toastMessages[response.status] : DEFAULT_TOAST_MESSAGES.success;
            if (method !== HTTP_METHODS.GET) this.#toast[status]({ title, description });
            return response.data;
        } catch (error) {
            const errorCode = (error as AxiosError).status!;

            const { status, title, description } =
                errorCode in toastMessages ? toastMessages[errorCode] : DEFAULT_TOAST_MESSAGES.error;

            this.#toast[status]({ title, description });
            if (onError) return onError(error as AxiosError);
        }
    };
}

export default APICore;
