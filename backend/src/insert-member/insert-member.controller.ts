import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Response } from 'src/type/response.type';

@Controller('insert-member')
export class InsertMemberController {
  constructor(
    private readonly service: InsertMemberService,
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  @Post()
  async insertUser(@Body() body: InsertUserDTO): Promise<Response> {
    return await this.manager.transaction(async (manager) => {
      return await this.service.insertUser(body, manager);
    });
  }
}
