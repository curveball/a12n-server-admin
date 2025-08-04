export const CLIENT_ROUTES = {
    ROOT: '/',
    AUTH_TRIGGER: '/auth/trigger',
    AUTH_REDIRECT: '/auth/redirect',
    USERS_TABLE: '/users/table',
    USERS_SANDBOX: '/users/sandbox',
    GROUPS_TABLE: '/groups/table',
    GROUPS_SANDBOX: '/groups/sandbox',
    APPS_TABLE: '/apps/table',
    APPS_SANDBOX: '/apps/sandbox',
    PRIVILEGES_TABLE: '/privileges/table',
    PRIVILEGES_SANDBOX: '/privileges/sandbox',
    NOT_FOUND: '/404',
};

export const SERVER_ROUTES = {
    LOGIN: '/login',
    USERS: '/user',
    PRIVILEGES: '/privilege',
    APPS: '/app',
    GROUPS: '/group',
    REGISTER_CONTINUE: '/register?continue=',
};

export type CLIENT_ROUTES = (typeof CLIENT_ROUTES)[keyof typeof CLIENT_ROUTES];
export type SERVER_ROUTES = (typeof SERVER_ROUTES)[keyof typeof SERVER_ROUTES];
