import { User as UserType } from "../types";

export class User {
    static parseUserID(user: UserType): string {
        return user._links.self.href.replace('/user/', '');
    }
}