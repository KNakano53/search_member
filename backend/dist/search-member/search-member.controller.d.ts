import { SearchMemberService } from './search-member.service';
export declare class SearchMemberController {
    private service;
    constructor(service: SearchMemberService);
    searchMemberForPagination(page?: number, limit?: number, id?: string, name?: string, address?: string, tel?: string): Promise<import("../type/response.type").Response>;
}
