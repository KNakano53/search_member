import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from 'src/entity/user/search.user.dto';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMemberForPagination(page: number, limit: number, body: SearchUserDTO): Promise<import("nestjs-typeorm-paginate").Pagination<import("../entity/user/users.entity").Users, import("nestjs-typeorm-paginate").IPaginationMeta> | import("../type/response.type").Response>;
    searchMember(body: SearchUserDTO): Promise<import("nestjs-typeorm-paginate").Pagination<import("../entity/user/users.entity").Users, import("nestjs-typeorm-paginate").IPaginationMeta> | import("../type/response.type").Response>;
}
