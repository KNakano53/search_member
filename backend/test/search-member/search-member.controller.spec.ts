import { Test, TestingModule } from '@nestjs/testing';
import { SearchMemberController } from '../../src/search-member/search-member.controller';
import { SearchMemberService } from '../../src/search-member/search-member.service';
import { SearchUserDTO } from '../../src/entity/user/search.user.dto';
import * as request from 'supertest';
import { SearchMemberModule } from 'src/search-member/search-member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user/users.entity';
import { Sequence } from 'src/entity/user/sequence.entity';

const result = {
  statusCode: 200,
  message: ['検索結果がありません'],
  data: { items: [] },
};

const serviceProider = {
  provide: SearchMemberService,
  useFactory: () => ({
    searchMember: jest.fn(() => {
      return Promise.resolve(result);
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

      expect(await controller.searchMemberForPagination(1, 20, dto)).toBe(
        result,
      );
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
    await app.init();
  }, 10000);

  afterAll(async () => {
    if (app && app.close) {
      await app.close();
    }
  });

  it('/POST items', () => {
    const dto: SearchUserDTO = {
      name: '',
      address: '',
      tel: '',
      id: '',
    };
    return request(app.getHttpServer())
      .post('/search-member')
      .send(dto)
      .expect(201)
      .expect(result); // 期待するレスポンス内容
  });
});
