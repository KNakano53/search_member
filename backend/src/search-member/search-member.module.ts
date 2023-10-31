import { Module } from '@nestjs/common';
import { SearchMemberController } from './search-member.controller';
import { SearchMemberService } from './search-member.service';

@Module({
  controllers: [SearchMemberController],
  providers: [SearchMemberService],
})
export class SearchMemberModule {}
