import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
export declare class SearchMemberService {
    private repository;
    constructor(repository: Repository<Users>);
    searchMember(body: SearchPostBody): Promise<Response>;
    private findAll;
    private findByAddress;
    private getFindAllFlag;
}
