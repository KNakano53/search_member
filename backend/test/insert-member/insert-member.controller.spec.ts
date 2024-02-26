/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { InsertMemberController } from 'src/insert-member/insert-member.controller';
import { InsertMemberService } from 'src/insert-member/insert-member.service';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import * as request from 'supertest';
import { InsertMemberModule } from 'src/insert-member/insert-member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Sequence } from 'src/entity/user/sequence.entity';
import { DataSource } from 'typeorm';

const result = {
  data: [],
  message: ['登録が完了しました', '新規加入者番号:TS0001'],
  status: 200,
};

const result2 = {
  data: [],
  message: ['登録が完了しました', '新規加入者番号:TS0002'],
  status: 200,
};

const errorResponse = {
  data: [],
  message: ['登録処理に失敗しました'],
  status: 400,
};

describe('InsertMemberController', () => {
  let controller: InsertMemberController;
  let service: InsertMemberService;

  beforeEach(async () => {
    const mockService = {
      insertUser: jest.fn(() => {
        return Promise.resolve(result);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsertMemberController],
      providers: [
        {
          provide: InsertMemberService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<InsertMemberController>(InsertMemberController);
    service = module.get<InsertMemberService>(InsertMemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call insertUser method of service with provided dto', async () => {
    const dto = new InsertUserDTO();
    dto.name = 'test name';
    dto.address = 'test address';
    dto.tel = '012345678';

    const response = await controller.insertUser(dto);

    // insertUser が呼び出されたことを確認
    expect(service.insertUser).toHaveBeenCalledWith(dto);
    expect(response).toEqual(result);
  });
});

describe('e2e Tests', () => {
  let app;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        InsertMemberModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Users, Sequence],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    if (app && app.close) {
      await app.close();
    }
  });

  it('insert User', async () => {
    const dto = new InsertUserDTO();
    dto.name = 'test name';
    dto.address = 'test address';
    dto.tel = '012345678';

    await request(app.getHttpServer())
      .post('/insert-member')
      .send(dto)
      .expect(201)
      .expect(result); // 期待するレスポンス内容

    const insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0001' });
    const expectUser: Users = dto;
    expectUser.id = 'TS0001';
    expect(insertUser).toEqual(expectUser);

    const insertSequence = await dataSource
      .getRepository(Sequence)
      .createQueryBuilder('sequence')
      .select('MAX(id)', 'id')
      .getRawOne<Sequence>();
    const expectSequence = { id: 1 };
    expect(insertSequence).toEqual(expectSequence);
  });

  it('insert User twice', async () => {
    const dto = new InsertUserDTO();
    dto.name = 'test name';
    dto.address = 'test address';
    dto.tel = '012345678';

    await request(app.getHttpServer())
      .post('/insert-member')
      .send(dto)
      .expect(201)
      .expect(result);

    await request(app.getHttpServer())
      .post('/insert-member')
      .send(dto)
      .expect(201)
      .expect(result2);

    let insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0001' });
    let expectUser: Users = dto;
    expectUser.id = 'TS0001';
    expect(insertUser).toEqual(expectUser);

    insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0002' });
    expectUser = dto;
    expectUser.id = 'TS0002';
    expect(insertUser).toEqual(expectUser);

    const insertSequence = await dataSource
      .getRepository(Sequence)
      .createQueryBuilder('sequence')
      .select('MAX(id)', 'id')
      .getRawOne<Sequence>();
    const expectSequence = { id: 2 };
    expect(insertSequence).toEqual(expectSequence);
  });

  it('roll back', async () => {
    const dto = new InsertUserDTO();
    dto.name = 'test name';
    dto.address = 'test address';
    dto.tel = '012345678';

    await request(app.getHttpServer())
      .post('/insert-member')
      .send(dto)
      .expect(201)
      .expect(result); // 期待するレスポンス内容

    let insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0001' });
    let expectUser: Users = dto;
    expectUser.id = 'TS0001';
    expect(insertUser).toEqual(expectUser);

    await dataSource.getRepository(Sequence).delete({ id: 1 });

    await request(app.getHttpServer())
      .post('/insert-member')
      .send(dto)
      .expect(201)
      .expect(errorResponse);

    insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0001' });
    expectUser = dto;
    expectUser.id = 'TS0001';
    expect(insertUser).toEqual(expectUser);

    insertUser = await dataSource
      .getRepository(Users)
      .findOneBy({ id: 'TS0002' });
    expectUser = null;
    expect(insertUser).toEqual(expectUser);

    const insertSequence = await dataSource
      .getRepository(Sequence)
      .createQueryBuilder('sequence')
      .select('MAX(id)', 'id')
      .getRawOne<Sequence>();
    const expectSequence = { id: null };
    expect(insertSequence).toEqual(expectSequence);
  });
});
