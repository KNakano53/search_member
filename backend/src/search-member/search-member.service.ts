import { Injectable } from '@nestjs/common';
import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';
import { generateUser } from 'src/entity/user-model/user-model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/user/users.entity';

@Injectable()
export class SearchMemberService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  searchMember(body: SearchPostBody): Promise<Response> {
    if (this.getFindAllFlag(body)) {
      return this.findAll();
    } else {
      return this.findByAddress();
    }
  }
  private async findAll(): Promise<Response> {
    const users = await this.repository.find();
    const response: Response = new Response(users);
    return response;
  }

  private async findByAddress(): Promise<Response> {
    const users = [
      generateUser('TS3234', '伊織 順平', '東京都', '012-345-678'),
      generateUser('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
    ];
    const response: Response = new Response(
      users,
      '検索処理でエラーが発生しました',
    );
    return response;
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
