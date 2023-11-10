import { SearchMemberService } from './search-member.service';
import { IUsers } from 'src/entity/user/user.interface';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMember(body: IUsers): Promise<import("../type/response.type").Response>;
}
