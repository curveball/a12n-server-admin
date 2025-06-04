export const CODE_VERIFIER_LOCAL_STORAGE_NAME = 'a12n_ADMIN_UI_CODE_VERIFIER';
export const AUTHORIZATION_CODE_QUERY_PARAM_NAME = 'code';
export const POST_AUTH_REDIRECT_QUERY_PARAM_NAME = 'redirect';
export const POST_AUTH_REDIRECT_PATH_LOCAL_STORAGE_NAME = 'a12n_ADMIN_UI_POST_AUTH_REDIRECT_PATH';

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

export const SERVER_EMBED_ITEM_PARAM = { embed: 'item' };

export enum HTTP_METHODS {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}
