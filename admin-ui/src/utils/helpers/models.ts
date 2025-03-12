import { Resource, User, App, Group } from '../types';

export class Users {
    static parseUserID(user: Resource<User>): string {
        return user._links.self.href.replace('/user/', '');
    }
}

export class Groups {
    static parseGroupID(group: Resource<Group>): string {
        return group._links.self.href.replace('/group/', '');
    }
}

export class Apps {
    static parseAppID(app: Resource<App>): string {
        return app._links.self.href.replace('/app/', '');
    }
}
