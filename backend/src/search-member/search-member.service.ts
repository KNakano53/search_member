import { Injectable } from '@nestjs/common';
import { Response, generateResponse } from 'src/type/response.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';
import { CustomObject } from 'src/type/object.type';
import { isEmpty } from 'lodash';
import { IUsers } from 'src/entity/user/user.interface';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class SearchMemberService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async searchMember(body: IUsers, option?: IPaginationOptions) {
    try {
      const conditions = this.createWhereConditions(body);

      return await this.findByConditions(option, conditions);
    } catch (e) {
      console.log(e);
      return generateResponse(
        { items: [] },
        ['検索処理でエラーが発生しました。'],
        400,
      );
    }
  }

  private createWhereConditions(body: IUsers): CustomObject {
    const conditions: CustomObject = {};

    if ('' !== body.id) {
      conditions.id = body.id;
    }
    if ('' !== body.name) {
      conditions.name = Like('%' + body.name + '%');
    }
    if ('' !== body.address) {
      conditions.address = Like('%' + body.address + '%');
    }
    if ('' !== body.tel) {
      conditions.tel = body.tel;
    }
    return conditions;
  }

  private async findByConditions(
    option: IPaginationOptions,
    conditions: CustomObject,
  ): Promise<Response> {
    const result = await paginate<Users>(this.repository, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
    if (isEmpty(result.items)) {
      return generateResponse({ items: [] }, ['検索結果がありません']);
    }
    return generateResponse(result);
  }
}
