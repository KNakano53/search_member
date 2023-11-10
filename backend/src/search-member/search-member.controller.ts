import { Body, Controller, Post } from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { SearchPostBody } from 'src/type/postBody.type';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Post()
  searchMember(@Body() body: SearchPostBody) {
    return this.service.searchMember(body);
  }
}
