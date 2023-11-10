import { Response } from 'src/type/response.type';
import { SearchPostBody } from 'src/type/postBody.type';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: SearchPostBody): Promise<Response>;
    private findAll;
    private findByParam;
    private getFindAllFlag;
}
