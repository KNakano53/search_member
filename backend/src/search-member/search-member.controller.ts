import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from 'src/entity/user/search.user.dto';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Get()
  async searchMemberForPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
    @Body() body: SearchUserDTO,
  ) {
    return await this.service.searchMember(body, {
      page,
      limit,
      route: 'http://localhost:3001/search-member',
    });
  }
}
