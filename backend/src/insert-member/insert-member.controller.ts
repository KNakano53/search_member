import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
import { Response } from 'src/type/response.type';

@Controller('insert-member')
export class InsertMemberController {
  constructor(private readonly service: InsertMemberService) {}

  @Post()
  async insertUser(@Body() body: InsertUserDTO): Promise<Response> {
    return await this.service.insertUser(body);
  }
}
