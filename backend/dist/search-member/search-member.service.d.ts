import { Response } from 'src/type/response.type';
import { Repository } from 'typeorm';
import { IUsers } from 'src/entity/user/user.interface';
import { Users } from 'src/entity/user/users.entity';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: IUsers): Promise<Response>;
    private findByParam;
    private createWhereConditions;
}
