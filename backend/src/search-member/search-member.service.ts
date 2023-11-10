import { Injectable } from '@nestjs/common';
import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';
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
    const users = [];
    const response: Response = new Response(users, '検索処理は実装中です');
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
