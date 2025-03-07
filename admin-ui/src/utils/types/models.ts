import { HalResource, HalLink } from 'hal-types';

export enum ResourceType {
    USER = 'user',
    APP = 'app',
    GROUP = 'group',
}

export interface BaseResource extends HalResource {
    _links: {
        self: HalLink;
        [rel: string]: HalLink | HalLink[];
    };
    nickname: string;
    active: boolean;
    createdAt: string;
    modifiedAt: string;
    type: ResourceType;
    privileges: Record<string, string[]>;
}

export type App = BaseResource & {};

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
};
