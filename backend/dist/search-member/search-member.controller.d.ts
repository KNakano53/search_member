import { SearchMemberService } from './search-member.service';
import { SearchPostBody } from 'src/postBody.type';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMember(body: SearchPostBody): import("../response.type").Response;
}
