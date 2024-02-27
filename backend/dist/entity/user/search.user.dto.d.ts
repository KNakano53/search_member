import { IUsers } from './user.interface';
export declare class SearchUserDTO implements IUsers {
    constructor(id?: string, name?: string, address?: string, tel?: string);
    id: string;
    name: string;
    address: string;
    tel: string;
}
