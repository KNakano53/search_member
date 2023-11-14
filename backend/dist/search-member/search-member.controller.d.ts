import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from 'src/entity/user/search.user.dto';
import { Response } from 'src/type/response.type';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMember(body: SearchUserDTO): Promise<Response>;
}
