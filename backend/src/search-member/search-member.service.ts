import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/entity/user-model/user-model';
import { IUser } from 'src/entity/user/user.interface';
import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';

@Injectable()
export class SearchMemberService {
  searchMember(body: SearchPostBody): Response {
    console.log(body);
    if (body.findAllFlag) {
      return this.findAll();
    } else {
      return this.findByAddress();
    }
  }
  private findAll(): Response {
    const users: IUser[] = [
      new UserModel('TS1234', '田中 太郎', '愛知県', '012-345-678'),
      new UserModel('TS2234', '藤本 亮介', '千葉県', '012-345-678'),
      new UserModel('TS3234', '伊織 順平', '東京都', '012-345-678'),
      new UserModel('TS4234', '里中 千枝', '長野県', '012-345-678'),
      new UserModel('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
    ];
    const response: Response = new Response(users);
    return response;
  }

  private findByAddress(): Response {
    const users: IUser[] = [
      new UserModel('TS3234', '伊織 順平', '東京都', '012-345-678'),
      new UserModel('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
    ];
    const response: Response = new Response(users);
    return response;
  }
}
