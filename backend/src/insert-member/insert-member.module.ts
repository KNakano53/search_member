import { Module } from '@nestjs/common';
import { InsertMemberController } from './insert-member.controller';
import { InsertMemberService } from './insert-member.service';

@Module({
  controllers: [InsertMemberController],
  providers: [InsertMemberService]
})
export class InsertMemberModule {}
