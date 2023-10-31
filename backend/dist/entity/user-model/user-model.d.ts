import { IUser } from '../user/user.interface';
export declare class UserModel implements IUser {
    id: string;
    name: string;
    address: string;
    tel: string;
    constructor(id: string, name: string, address: string, tel: string);
}
