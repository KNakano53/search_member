import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';

@Controller('insert-member')
export class InsertMemberController {
  constructor(private service: InsertMemberService) {}

  @Post()
  insertUser(@Body() body: InsertUserDTO) {
    return this.service.insertUser(body);
  }
}
