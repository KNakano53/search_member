import { SearchMemberService } from './search-member.service';
import { SearchPostBody } from 'src/type/postBody.type';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMember(body: SearchPostBody): Promise<import("../type/response.type").Response>;
}
