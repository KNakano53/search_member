import { Module } from '@nestjs/common';
import { SearchMemberController } from './search-member.controller';
import { SearchMemberService } from './search-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [SearchMemberController],
  providers: [SearchMemberService],
})
export class SearchMemberModule {}
