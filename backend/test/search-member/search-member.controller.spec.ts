import { Test, TestingModule } from '@nestjs/testing';
import { SearchMemberController } from '../../src/search-member/search-member.controller';
import { SearchMemberService } from '../../src/search-member/search-member.service';
import { SearchUserDTO } from '../../src/entity/user/search.user.dto';
import * as request from 'supertest';
import { SearchMemberModule } from 'src/search-member/search-member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Sequence } from 'src/entity/user/sequence.entity';
import { EntityManager } from 'typeorm';
import { Response } from 'src/type/response.type';

const successResult = {
  status: 200,
  message: [''],
  data: {
    items: [
      {
        id: 'TS0001',
        name: 'テスト氏名1',
        address: 'テスト住所1',
        tel: '0123456789',
      },
      {
        id: 'TS0002',
        name: 'テスト氏名2',
        address: 'テスト住所2',
        tel: '0123456789',
      },
      {
        id: 'TS0003',
        name: 'テスト氏名3',
        address: 'テスト住所3',
        tel: '0123456789',
      },
    ],
    meta: {
      totalItems: 3,
      itemCount: 3,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: 'http://localhost:3001/search-member?limit=20',
      previous: '',
      next: '',
      last: 'http://localhost:3001/search-member?page=1&limit=20',
    },
  },
};

const notFindResponse: Response = {
  status: 200,
  message: ['検索結果がありません'],
  data: { items: [] },
};

const serviceProider = {
  provide: SearchMemberService,
  useFactory: () => ({
    searchMember: jest.fn(() => {
      return Promise.resolve(successResult);
    }),
  }),
};

describe('SearchMemberController', () => {
  let controller: SearchMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchMemberController],
      providers: [serviceProider],
    }).compile();

    controller = module.get<SearchMemberController>(SearchMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchMemberForPagination', () => {
    it('should return a paginated list of members', async () => {
      const dto: SearchUserDTO = {
        name: '',
        address: '',
        tel: '',
        id: '',
      };

      expect(
        await controller.searchMemberForPagination(
          1,
          20,
          dto.id,
          dto.name,
          dto.address,
          dto.tel,
        ),
      ).toBe(successResult);
    });

    it('should return a paginated list of members with default page and limit', async () => {
      const dto: SearchUserDTO = {
        name: '',
        address: '',
        tel: '',
        id: '',
      };

      expect(
        await controller.searchMemberForPagination(
          undefined,
          undefined,
          dto.id,
          dto.name,
          dto.address,
          dto.tel,
        ),
      ).toBe(successResult);
    });

    it('should return a paginated list of members specified page and limit', async () => {
      const dto: SearchUserDTO = {
        name: '',
        address: '',
        tel: '',
        id: '',
      };

      expect(
        await controller.searchMemberForPagination(
          2,
          50,
          dto.id,
          dto.name,
          dto.address,
          dto.tel,
        ),
      ).toBe(successResult);
    });
  });
});

describe('e2e Tests', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SearchMemberModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Users, Sequence],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const entityManager = app.get(EntityManager);
    await entityManager.query(`
      insert into users (id,name,address,tel)
      values 
      ('TS0001','テスト氏名1','テスト住所1','0123456789'),
      ('TS0002','テスト氏名2','テスト住所2','0123456789'),
      ('TS0003','テスト氏名3','テスト住所3','0123456789')
      `);

    await app.init();
  }, 10000);

  afterAll(async () => {
    if (app && app.close) {
      await app.close();
    }
  });

  it('/GET items', () => {
    const dto: SearchUserDTO = {
      name: '',
      address: '',
      tel: '',
      id: '',
    };
    return request(app.getHttpServer())
      .get('/search-member')
      .send(dto)
      .expect(200)
      .expect(successResult); // 期待するレスポンス内容
  });
  it('/GET items with option', () => {
    const dto = {
      name: '',
      address: '',
      tel: '',
      id: '',
    };
    return request(app.getHttpServer())
      .get('/search-member?page=2&limit=50')
      .send(dto)
      .expect(200)
      .expect(notFindResponse); // 期待するレスポンス内容
  });
});
