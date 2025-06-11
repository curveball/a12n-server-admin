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

export enum ResourceType {
    USER = 'user',
    APP = 'app',
    GROUP = 'group',
}
