import { Response } from 'src/type/response.type';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { IUsers } from 'src/entity/user/user.interface';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: IUsers, option?: IPaginationOptions): Promise<Response>;
    private createWhereConditions;
    private findForPaginate;
}
