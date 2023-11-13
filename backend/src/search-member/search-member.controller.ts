import { Body, Controller, Post } from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from 'src/entity/user/search.user.dto';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Post()
  searchMember(@Body() body: SearchUserDTO) {
    return this.service.searchMember(body);
  }
}
