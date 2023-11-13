import { Response } from 'src/type/response.type';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { IUsers } from 'src/entity/user/user.interface';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: IUsers): Promise<Response>;
    private findByParam;
    private createWhereConditions;
}
