import { HalResource } from 'hal-types';

export type Resource<T extends Record<string, unknown> = Record<string, never>> = HalResource<T>;

export type Collection<T extends Record<string, unknown> = Record<string, never>> = HalResource<T> & {
    _embedded: {
        item: Resource<T>[];
    };
};

type BaseResource = {
    nickname: string;
    active: boolean;
    createdAt: string;
    modifiedAt: string;
    type: ResourceType;
    privileges: Record<string, string[]>;
};

export type App = BaseResource;

export type TemplateProperty = {
    type: string;
    name: string;
    value?: string;
};

export type Template = {
    method: string;
    title: string;
    target: string;
    properties: TemplateProperty[];
};

export type Group = BaseResource;

export type User = BaseResource & {
    hasPassword: boolean;
    password?: string;
    verifiedAt?: string;
};

export type Model = App | Template | Group | User;

export enum CLIENT_ROUTES {
    ROOT = '/',
    AUTH_TRIGGER = '/auth/trigger',
    AUTH_REDIRECT = '/auth/redirect',
    USERS_TABLE = '/users/table',
    USERS_SANDBOX = '/users/sandbox',
    GROUPS_TABLE = '/groups/table',
    GROUPS_SANDBOX = '/groups/sandbox',
    APPS_TABLE = '/apps/table',
    APPS_SANDBOX = '/apps/sandbox',
    PRIVILEGES_TABLE = '/privileges/table',
    PRIVILEGES_SANDBOX = '/privileges/sandbox',
    NOT_FOUND = '/404',
}

export enum SERVER_ROUTES {
    USERS = '/user',
    PRIVILEGES = '/privilege',
    APPS = '/app',
    GROUPS = '/group',
}

export enum ResourceType {
    USER = 'user',
    APP = 'app',
    GROUP = 'group',
}
