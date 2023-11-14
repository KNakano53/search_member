import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Response } from 'src/type/response.type';
export declare class InsertMemberService {
    insertUser(body: InsertUserDTO): Promise<Response>;
}
