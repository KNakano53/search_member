import { Injectable } from '@nestjs/common';
import { Response } from 'src/type/response.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { SearchObject } from 'src/type/object.interface';
import { isEmpty } from 'lodash';
import { IUsers } from 'src/entity/user/user.interface';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SearchMemberService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async searchMember(body: IUsers, option?: IPaginationOptions) {
    try {
      const conditions = this.createWhereConditions(body);

      // return await this.findByParam(conditions);
      return await this.findForPaginate(option, conditions);
    } catch (e) {
      console.log(e);
      const response = new Response([], ['検索処理でエラーが発生しました。']);
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

    if (isEmpty(users)) {
      return new Response([], ['検索結果がありません']);
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

  private async findForPaginate(
    option: IPaginationOptions,
    conditions: SearchObject,
  ): Promise<Pagination<Users>> {
    console.log(conditions);
    return paginate<Users>(this.repository, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  }
}
