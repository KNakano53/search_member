import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Response } from 'src/type/response.type';
import { EntityManager } from 'typeorm';
export declare class InsertMemberService {
    constructor();
    insertUser(body: InsertUserDTO, manager?: EntityManager): Promise<Response>;
    private saveUser;
    private getLastNum;
    private generateUserID;
    private zeroPadding;
}
