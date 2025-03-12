import { Resource, User } from '../types';

export class Users {
    static parseUserID(user: Resource<User>): string {
        return user._links.self.href.replace('/user/', '');
    }
}
