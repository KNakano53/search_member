import { Body, Controller, Post } from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from 'src/entity/user/search.user.dto';
import { Response } from 'src/type/response.type';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Post()
  async searchMember(@Body() body: SearchUserDTO): Promise<Response> {
    return await this.service.searchMember(body);
  }
}
