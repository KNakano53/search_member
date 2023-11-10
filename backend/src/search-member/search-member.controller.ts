import { Body, Controller, Post } from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { IUsers } from 'src/entity/user/user.interface';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Post()
  searchMember(@Body() body: IUsers) {
    return this.service.searchMember(body);
  }
}
