import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from '../../src/entity/user/users.entity';
import { SearchMemberService } from 'src/search-member/search-member.service';
import { IUsers } from '../../src/entity/user/user.interface';
import { paginate } from 'nestjs-typeorm-paginate';
import { Response } from 'src/type/response.type';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ items: [], meta: {}, links: {} }),
    ),
}));

describe('SearchMemberService', () => {
  let service: SearchMemberService;
  let repo: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchMemberService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SearchMemberService>(SearchMemberService);
    repo = module.get<Repository<Users>>(getRepositoryToken(Users));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ID検索', async () => {
    const testBody: IUsers = {
      id: 'testID',
      name: '',
      address: '',
      tel: '',
    };
    const option = undefined;
    const conditions = { id: 'testID' };
    const result = await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
    const expectResult: Response = {
      statusCode: 200,
      message: ['検索結果がありません'],
      data: { items: [] },
    };
    expect(result).toStrictEqual(expectResult);
  });

  it('名前検索', async () => {
    const testBody: IUsers = {
      id: '',
      name: 'testName',
      address: '',
      tel: '',
    };
    const option = undefined;
    const conditions = { name: Like('%testName%') };
    await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('住所検索', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: 'testAddress',
      tel: '',
    };
    const option = undefined;
    const conditions = { address: Like('%testAddress%') };
    await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('電話番号検索', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: '',
      tel: 'testTel',
    };
    const option = undefined;
    const conditions = { tel: 'testTel' };
    await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('全項目検索', async () => {
    const testBody: IUsers = {
      id: 'testID',
      name: 'testName',
      address: 'testAddress',
      tel: 'testTel',
    };
    const option = undefined;
    const conditions = {
      id: 'testID',
      name: Like('%testName%'),
      address: Like('%testAddress%'),
      tel: 'testTel',
    };
    await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('全件検索', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: '',
      tel: '',
    };
    const option = undefined;
    const conditions = {};
    await service.searchMember(testBody);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });
});
