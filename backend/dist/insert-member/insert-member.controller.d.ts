import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
export declare class InsertMemberController {
    private service;
    constructor(service: InsertMemberService);
    insertUser(body: InsertUserDTO): Promise<import("../type/response.type").Response>;
}
