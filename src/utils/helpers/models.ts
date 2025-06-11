import { App, Group, Resource, User } from '../../types/models';

export class Users {
    static parseUserID(user: Resource<User>): string {
        return user._links.self.href.replace('/user/', '');
    }

    static parseEmail(user: Resource<User>): string {
        let email = 'N/A';
        let me = user._links.me;

        if (me == undefined || me == null) {
            return email;
        }

        if (!Array.isArray(me)) {
            me = [me];
        }

        for (const item of me) {
            if (item.href.startsWith('mailto:')) {
                email = item.href.replace('mailto:', '');
                break;
            }
        }

        return email;
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
