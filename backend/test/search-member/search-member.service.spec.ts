import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Users } from '../../src/entity/user/users.entity';
import { SearchMemberService } from 'src/search-member/search-member.service';
import { IUsers } from '../../src/entity/user/user.interface';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Response } from 'src/type/response.type';

const successData = {
  items: [
    {
      id: 'test1',
      name: 'test1',
      address: 'test1',
      tel: '0120',
    },
  ],
  meta: {
    totalItems: 1,
    itemCount: 1,
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
};

const limitFailResult: Response = {
  status: 400,
  message: ['表示件数はプルダウンから選択してください'],
  data: { items: [] },
};

const successResult: Response = {
  status: 200,
  message: [''],
  data: successData,
};

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockImplementation(() => Promise.resolve(successData)),
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

  it('find by ID and generate response', async () => {
    const testBody: IUsers = {
      id: 'testID',
      name: '',
      address: '',
      tel: '',
    };
    const option: IPaginationOptions = {
      limit: 20,
      page: 1,
    };
    const conditions = { id: 'testID' };
    const result = await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
    const expectResult = successResult;
    expect(result).toStrictEqual(expectResult);
  });

  it('find By Name', async () => {
    const testBody: IUsers = {
      id: '',
      name: 'testName',
      address: '',
      tel: '',
    };
    const option: IPaginationOptions = {
      limit: 20,
      page: 1,
    };
    const conditions = { name: Like('%testName%') };
    await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('find By Address', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: 'testAddress',
      tel: '',
    };
    const option: IPaginationOptions = {
      limit: 50,
      page: 1,
    };
    const conditions = { address: Like('%testAddress%') };
    await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('find by Tel', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: '',
      tel: 'testTel',
    };
    const option: IPaginationOptions = {
      limit: 50,
      page: 1,
    };
    const conditions = { tel: 'testTel' };
    await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('find by all column', async () => {
    const testBody: IUsers = {
      id: 'testID',
      name: 'testName',
      address: 'testAddress',
      tel: 'testTel',
    };
    const option: IPaginationOptions = {
      limit: 100,
      page: 1,
    };
    const conditions = {
      id: 'testID',
      name: Like('%testName%'),
      address: Like('%testAddress%'),
      tel: 'testTel',
    };
    await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('find all records', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: '',
      tel: '',
    };
    const option: IPaginationOptions = {
      limit: 100,
      page: 1,
    };
    const conditions = {};
    await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
  });

  it('failed by limit', async () => {
    const testBody: IUsers = {
      id: '',
      name: '',
      address: '',
      tel: '',
    };
    const option: IPaginationOptions = {
      limit: 10,
      page: 1,
    };
    const result = await service.searchMember(testBody, option);
    const expectResult = limitFailResult;
    expect(result).toStrictEqual(expectResult);
    expect(paginate).toBeCalledTimes(0);
  });
});
