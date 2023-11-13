import { Injectable } from '@nestjs/common';
import { Response } from 'src/type/response.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { SearchObject } from 'src/type/object.interface';
import * as _ from 'lodash';
import { IUsers } from 'src/entity/user/user.interface';

@Injectable()
export class SearchMemberService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async searchMember(body: IUsers): Promise<Response> {
    try {
      const conditions = this.createWhereConditions(body);

      return this.findByParam(conditions);
    } catch (e) {
      console.log(e);
      const response = new Response([], '検索処理でエラーが発生しました。');
      return response;
    }
  }

  private async findByParam(conditions: SearchObject): Promise<Response> {
    const users = await this.repository.find({
      where: conditions,
      order: {
        id: 'asc',
      },
    });

    if (_.isEmpty(users)) {
      return new Response([], '検索結果がありません');
    }

    return new Response(users);
  }

  private createWhereConditions(body: IUsers): SearchObject {
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
