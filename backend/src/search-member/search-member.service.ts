import { Injectable } from '@nestjs/common';
import { Response } from 'src/type/response.type';
import { SearchPostBody } from 'src/type/postBody.type';
import { generateUser } from 'src/entity/user-model/user-model';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { SearchObject } from 'src/type/object.interface';

@Injectable()
export class SearchMemberService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  searchMember(body: SearchPostBody): Promise<Response> {
    if (this.getFindAllFlag(body)) {
      return this.findAll();
    } else {
      return this.findByParam(body);
    }
  }

  private async findAll(): Promise<Response> {
    const users = await this.repository.find();
    const response: Response = new Response(users);
    return response;
  }

  private async findByParam(body: SearchPostBody): Promise<Response> {
    try {
      const conditions: SearchObject = createWhereConditions();

      const users = await this.repository.find({
        where: conditions,
        order: {
          id: 'asc',
        },
      });

      const response = new Response(users);
      return response;
    } catch (e) {
      console.log(e);
      const response = new Response([], '検索処理でエラーが発生しました');
      return response;
    }

    function createWhereConditions() {
      const conditions: SearchObject = {};

      if (body.id !== '') {
        conditions.id = body.id;
      }
      if (body.name !== '') {
        conditions.name = Like('%' + body.name + '%');
      }
      if (body.address !== '') {
        conditions.address = Like('%' + body.address + '%');
      }
      if (body.tel !== '') {
        conditions.tel = body.tel;
      }
      return conditions;
    }
  }

  private getFindAllFlag(body: SearchPostBody): boolean {
    if (
      '' == body.id &&
      '' == body.name &&
      '' == body.address &&
      '' == body.tel
    ) {
      return true;
    }
    return false;
  }
}
