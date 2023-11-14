import { Injectable } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Response } from 'src/type/response.type';
import * as _ from 'lodash';

@Injectable()
export class InsertMemberService {
  async insertUser(body: InsertUserDTO) {
    if (!_.isEmpty(body.name)) {
      return new Response([], ['登録が完了しました', '新規加入者番号:TS0101']);
    } else {
      return new Response([], ['登録に失敗しました']);
    }
  }
}
