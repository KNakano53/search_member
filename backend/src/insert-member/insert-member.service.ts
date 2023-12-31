import { Injectable } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Response, generateResponse } from 'src/type/response.type';
import { Users } from 'src/entity/user/users.entity';
import { EntityManager } from 'typeorm';
import { Sequence } from 'src/entity/user/sequence.entity';

@Injectable()
export class InsertMemberService {
  async insertUser(
    body: InsertUserDTO,
    manager?: EntityManager,
  ): Promise<Response> {
    try {
      const savedUser = await this.saveUser(body, manager);
      return generateResponse(
        [],
        ['登録が完了しました', '新規加入者番号:' + savedUser.id],
      );
    } catch (e) {
      console.log(e);
      return generateResponse([], ['登録処理に失敗しました'], 400);
    }
  }

  private async saveUser(
    body: InsertUserDTO,
    manager: EntityManager,
  ): Promise<Users> {
    const user: Users = body;
    user.id = await this.generateUserID(manager);
    return manager.getRepository(Users).save(user);
  }

  private async getLastNum(manager: EntityManager): Promise<Sequence> {
    const sequence = await manager
      .getRepository(Sequence)
      .createQueryBuilder('sequence')
      .select('MAX(id)+1', 'id')
      .getRawOne<Sequence>();

    return manager.getRepository(Sequence).save(sequence);
  }

  private async generateUserID(manager: EntityManager): Promise<string> {
    const idNum: number = (await this.getLastNum(manager)).id;
    const strHeader: string = 'TS';
    return strHeader + this.zeroPadding(idNum, 4);
  }

  private zeroPadding(num: number, digits: number): string {
    let strNum = num.toString();
    while (strNum.length < digits) {
      strNum = '0' + strNum;
    }
    return strNum;
  }
}
