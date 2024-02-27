import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SearchMemberService } from './search-member.service';
import { SearchUserDTO } from '../entity/user/search.user.dto';

@Controller('search-member')
export class SearchMemberController {
  constructor(private service: SearchMemberService) {}

  @Get()
  async searchMemberForPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
    @Query('id') id: string = '',
    @Query('name') name: string = '',
    @Query('address') address: string = '',
    @Query('tel') tel: string = '',
  ) {
    return await this.service.searchMember(
      new SearchUserDTO(id, name, address, tel),
      {
        page,
        limit,
        route: 'http://localhost:3001/search-member',
      },
    );
  }
}
