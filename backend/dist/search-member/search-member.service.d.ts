import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';
export declare class SearchMemberService {
    searchMember(body: SearchPostBody): Response;
    private findAll;
    private findByAddress;
}
