import { HalResource } from 'hal-types';
import { ResourceType } from '../constants';

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

export type Group = BaseResource & {
    _templates: Record<string, Template>;
};

export type User = BaseResource & {
    hasPassword: boolean;
    password?: string;
};

export type Model = App | Template | Group | User;
