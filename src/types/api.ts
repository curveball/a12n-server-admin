import { AxiosError } from 'axios';
import { TOAST_TYPE } from '../utils/constants';
import { App, Collection, Group, Resource, User } from './models';

export type APIQueryParams = Record<string, string | number | boolean | undefined>;

export type QueryRequestParams = {
    suffix?: string;
    params?: APIQueryParams;
    toastMessages?: APIResponseToastMessages;
    onError?: (error: AxiosError) => void;
};

export type MutationRequestParams = {
    suffix?: string;
    body?: APIRequestBody;
    params?: APIQueryParams;
    toastMessages?: APIResponseToastMessages;
    onError?: (error: AxiosError) => void;
};

export type APIRequestBody = CreateUserAPIRequest | UpdateUserAPIRequest | Record<string, never>;

export type APIResponseToastMessages = {
    [key: number]: {
        status: TOAST_TYPE;
        title: string;
        description: string;
    };
};

export type APIResourceResponse = Resource<User> | Resource<App> | Resource<Group>;
export type APICollectionResponse = Collection<User> | Collection<App> | Collection<Group>;

export type CreateUserAPIRequest = {
    nickname: string;
    email: string;
    markEmailValid: string;
    autoGeneratePassword?: string;
};

export type UpdateUserAPIRequest = {
    nickname: string;
    type: string;
    active: boolean;
};
