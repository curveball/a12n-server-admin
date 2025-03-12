import { Resource, User, App } from '../types';

export class Users {
    static parseUserID(user: Resource<User>): string {
        return user._links.self.href.replace('/user/', '');
    }
}

export class Apps {
    static parseAppID(app: Resource<App>): string {
        return app._links.self.href.replace('/app/', '');
    }
}

