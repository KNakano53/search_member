import { Injectable } from '@nestjs/common';
import { Response } from 'src/response.type';
import { SearchPostBody } from 'src/postBody.type';
import { generateUser } from 'src/entity/user-model/user-model';

@Injectable()
export class SearchMemberService {
  searchMember(body: SearchPostBody): Response {
    if (this.getFindAllFlag(body)) {
      return this.findAll();
    } else {
      return this.findByAddress();
    }
  }
  private findAll(): Response {
    const users = [
      generateUser('TS1234', '田中 太郎', '愛知県', '012-345-678'),
      generateUser('TS2234', '藤本 亮介', '千葉県', '012-345-678'),
      generateUser('TS3234', '伊織 順平', '東京都', '012-345-678'),
      generateUser('TS4234', '里中 千枝', '長野県', '012-345-678'),
      generateUser('TS5234', '雨宮 蓮', '東京都', '012-345-678'),
    ];
    const response: Response = new Response(users);
    return response;
  }

  private findByAddress(): Response {
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
