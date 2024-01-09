import { Injectable } from '@nestjs/common';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Response, generateResponse } from 'src/type/response.type';
import { Users } from 'src/entity/user/users.entity';
import { EntityManager } from 'typeorm';
import { Sequence } from 'src/entity/user/sequence.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class InsertMemberService {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  async insertUser(body: InsertUserDTO): Promise<Response> {
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          const savedUser = await this.saveUser(
            transactionalEntityManager,
            body,
          );
          return generateResponse(
            [],
            ['登録が完了しました', '新規加入者番号:' + savedUser.id],
          );
        } catch (e) {
          console.log(e);
          return generateResponse([], ['登録処理に失敗しました'], 400);
        }
      },
    );
  }

  private async saveUser(
    entityManager: EntityManager,
    body: InsertUserDTO,
  ): Promise<Users> {
    const user: Users = body;
    user.id = await this.generateUserID(entityManager);
    return entityManager.getRepository(Users).save(user);
  }

  private async getLastNum(entityManager: EntityManager): Promise<Sequence> {
    const sequence = await entityManager
      .getRepository(Sequence)
      .createQueryBuilder('sequence')
      .select('MAX(id)+1', 'id')
      .getRawOne<Sequence>();

    return entityManager.getRepository(Sequence).save(sequence);
  }

  private async generateUserID(entityManager: EntityManager): Promise<string> {
    const idNum: number = (await this.getLastNum(entityManager)).id;
    const strHeader: string = 'TS';
    return strHeader + this.zeroPadding(idNum, 4);
  }

  private zeroPadding(num: number, digits: number): string {
    let strNum;
    if (num == undefined) {
      strNum = '1';
    } else {
      strNum = num.toString();
    }
    while (strNum.length < digits) {
      strNum = '0' + strNum;
    }
    return strNum;
  }
}
