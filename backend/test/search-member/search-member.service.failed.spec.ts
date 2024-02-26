import { Test } from '@nestjs/testing/test';
import { TestingModule } from '@nestjs/testing/testing-module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { IUsers } from 'src/entity/user/user.interface';
import { Users } from 'src/entity/user/users.entity';
import { SearchMemberService } from 'src/search-member/search-member.service';
import { Response } from 'src/type/response.type';
import { Repository } from 'typeorm/repository/Repository';

const findErrorResult: Response = {
  statusCode: 400,
  message: ['検索処理でエラーが発生しました。'],
  data: { items: [] },
};

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockRejectedValue(new Error('Find Error')),
}));

describe('SearchMemberService Error', () => {
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

  it('fail find method', async () => {
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
    const result = await service.searchMember(testBody, option);
    expect(paginate).toBeCalledTimes(1);
    expect(paginate).toHaveBeenCalledWith(repo, option, {
      where: conditions,
      order: {
        id: 'asc',
      },
    });
    expect(result).toStrictEqual(findErrorResult);
  });
});
