import { IUser } from '../user/user.interface';

export class UserModel implements IUser {
  id: string;
  name: string;
  address: string;
  tel: string;

  constructor(id: string, name: string, address: string, tel: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.tel = tel;
  }
}
