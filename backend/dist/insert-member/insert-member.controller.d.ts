import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
import { EntityManager } from 'typeorm';
import { Response } from 'src/type/response.type';
export declare class InsertMemberController {
    private readonly service;
    private readonly manager;
    constructor(service: InsertMemberService, manager: EntityManager);
    insertUser(body: InsertUserDTO): Promise<Response>;
}
