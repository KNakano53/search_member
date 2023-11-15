import { Response } from 'src/type/response.type';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { IUsers } from 'src/entity/user/user.interface';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: IUsers, option?: IPaginationOptions): Promise<Pagination<Users, import("nestjs-typeorm-paginate").IPaginationMeta> | Response>;
    private findByParam;
    private createWhereConditions;
    private findForPaginate;
}
