import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
import { Response } from 'src/type/response.type';
export declare class InsertMemberController {
    private readonly service;
    constructor(service: InsertMemberService);
    insertUser(body: InsertUserDTO): Promise<Response>;
}
