import { Body, Controller, Post } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { InsertMemberService } from './insert-member.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Controller('insert-member')
export class InsertMemberController {
  constructor(
    private readonly service: InsertMemberService,
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  @Post()
  async insertUser(@Body() body: InsertUserDTO) {
    return await this.manager.transaction(async (manager) => {
      return this.service.insertUser(body, manager);
    });
  }
}
