import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { InsertMemberService } from 'src/insert-member/insert-member.service';
import { EntityManager } from 'typeorm';
import { InsertUserDTO } from 'src/entity/user/insert.user.dto';
import { Users } from 'src/entity/user/users.entity';
import { Sequence } from 'src/entity/user/sequence.entity';

const successResponse = {
  data: [],
  message: ['登録が完了しました', '新規加入者番号:TS0001'],
  statusCode: 200,
};

const errorResponse = {
  data: [],
  message: ['登録処理に失敗しました'],
  statusCode: 400,
};

describe('InsertMemberService', () => {
  let service: InsertMemberService;
  let entityManagerMock: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsertMemberService,
        { provide: EntityManager, useValue: createMock<EntityManager>() },
      ],
    }).compile();

    service = module.get<InsertMemberService>(InsertMemberService);
    entityManagerMock = module.get<EntityManager>(EntityManager);
  });

  it('should insert a user successfully', async () => {
    const user = new Users();
    user.id = 'TS0001';
    const sequence = new Sequence(1);
    // リポジトリのモックを設定
    const usersRepositoryMock = {
      insert: jest.fn().mockResolvedValue(user),
    };
    const sequenceRepositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ id: 1 }),
      }),
      insert: jest.fn().mockResolvedValue(sequence),
    };

    jest
      .spyOn(entityManagerMock, 'transaction')
      .mockImplementation(async (...args) => {
        const cb = args[args.length - 1];
        // コールバック関数が関数であることを確認
        if (typeof cb !== 'function') {
          throw new Error('Expected a callback function as the last argument');
        }
        // transactionalEntityManagerMockをEntityManagerのインスタンスとして作成
        const transactionalEntityManagerMock = createMock<EntityManager>();

        // getRepositoryメソッドだけをモック
        transactionalEntityManagerMock.getRepository = jest
          .fn()
          .mockImplementation((entity) => {
            if (entity === Users) {
              return usersRepositoryMock;
            }
            if (entity === Sequence) {
              return sequenceRepositoryMock;
            }
            throw new Error('Not mocked entity');
          });

        return cb(transactionalEntityManagerMock);
      });

    const userDto = new InsertUserDTO();
    const response = await service.insertUser(userDto);

    expect(entityManagerMock.transaction).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response).toEqual(successResponse);

    expect(usersRepositoryMock.insert).toHaveBeenCalled();

    expect(sequenceRepositoryMock.insert).toHaveBeenCalled();
  });
});

describe('InsertMemberService - Error Cases', () => {
  let service: InsertMemberService;
  let entityManagerMock: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsertMemberService,
        { provide: EntityManager, useValue: createMock<EntityManager>() },
      ],
    }).compile();

    service = module.get<InsertMemberService>(InsertMemberService);
    entityManagerMock = module.get<EntityManager>(EntityManager);
  });

  it('should handle errors when saving a user', async () => {
    // ユーザー保存時のエラーをシミュレート
    const sequence = new Sequence(1);
    // リポジトリのモックを設定
    const usersRepositoryMock = {
      insert: jest.fn().mockRejectedValue(new Error('Transaction failed')),
    };
    const sequenceRepositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ id: 1 }),
      }),
      insert: jest.fn().mockResolvedValue(sequence),
    };

    jest
      .spyOn(entityManagerMock, 'transaction')
      .mockImplementation(async (...args) => {
        const cb = args[args.length - 1];
        // コールバック関数が関数であることを確認
        if (typeof cb !== 'function') {
          throw new Error('Expected a callback function as the last argument');
        }
        // transactionalEntityManagerMockをEntityManagerのインスタンスとして作成
        const transactionalEntityManagerMock = createMock<EntityManager>();

        // getRepositoryメソッドだけをモック
        transactionalEntityManagerMock.getRepository = jest
          .fn()
          .mockImplementation((entity) => {
            if (entity === Users) {
              return usersRepositoryMock;
            }
            if (entity === Sequence) {
              return sequenceRepositoryMock;
            }
            throw new Error('Not mocked entity');
          });

        return cb(transactionalEntityManagerMock);
      });

    const userDto = new InsertUserDTO();
    const response = await service.insertUser(userDto);

    // エラーレスポンスを期待
    expect(response).toEqual(errorResponse);
  });

  it('should handle errors during ID generation', async () => {
    // ID生成時のエラーをシミュレート
    const user = new Users();
    user.id = 'TS0001';
    const sequence = new Sequence(1);
    // リポジトリのモックを設定
    const usersRepositoryMock = {
      insert: jest.fn().mockResolvedValue(user),
    };
    const sequenceRepositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockRejectedValue(new Error('Transaction failed')),
      }),
      insert: jest.fn().mockResolvedValue(sequence),
    };

    jest
      .spyOn(entityManagerMock, 'transaction')
      .mockImplementation(async (...args) => {
        const cb = args[args.length - 1];
        // コールバック関数が関数であることを確認
        if (typeof cb !== 'function') {
          throw new Error('Expected a callback function as the last argument');
        }
        // transactionalEntityManagerMockをEntityManagerのインスタンスとして作成
        const transactionalEntityManagerMock = createMock<EntityManager>();

        // getRepositoryメソッドだけをモック
        transactionalEntityManagerMock.getRepository = jest
          .fn()
          .mockImplementation((entity) => {
            if (entity === Users) {
              return usersRepositoryMock;
            }
            if (entity === Sequence) {
              return sequenceRepositoryMock;
            }
            throw new Error('Not mocked entity');
          });

        return cb(transactionalEntityManagerMock);
      });

    const userDto = new InsertUserDTO();
    const response = await service.insertUser(userDto);

    // エラーレスポンスを期待
    expect(response).toEqual(errorResponse);
  });

  it('should handle errors during transaction', async () => {
    // トランザクション処理中のエラーをシミュレート
    const user = new Users();
    user.id = 'TS0001';

    // リポジトリのモックを設定
    const usersRepositoryMock = {
      insert: jest.fn().mockResolvedValue(user),
    };
    const sequenceRepositoryMock = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ id: 1 }),
      }),
      insert: jest.fn().mockRejectedValue(new Error('Transaction failed')),
    };

    jest
      .spyOn(entityManagerMock, 'transaction')
      .mockImplementation(async (...args) => {
        const cb = args[args.length - 1];
        // コールバック関数が関数であることを確認
        if (typeof cb !== 'function') {
          throw new Error('Expected a callback function as the last argument');
        }
        // transactionalEntityManagerMockをEntityManagerのインスタンスとして作成
        const transactionalEntityManagerMock = createMock<EntityManager>();

        // getRepositoryメソッドだけをモック
        transactionalEntityManagerMock.getRepository = jest
          .fn()
          .mockImplementation((entity) => {
            if (entity === Users) {
              return usersRepositoryMock;
            }
            if (entity === Sequence) {
              return sequenceRepositoryMock;
            }
            throw new Error('Not mocked entity');
          });

        return cb(transactionalEntityManagerMock);
      });

    const userDto = new InsertUserDTO();
    const response = await service.insertUser(userDto);

    // エラーレスポンスを期待
    expect(response).toEqual(errorResponse);
  });
});
