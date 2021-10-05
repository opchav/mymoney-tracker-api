import { Test, TestingModule } from '@nestjs/testing';

import { ROLE } from '../auth/constants/role.constant';
import { AppLogger } from '../shared/logger/logger.service';
import { RequestContext } from '../shared/request-context/request-context.dto';
import { UserService } from '../user/services/user.service';
import { CreateTransactionInput } from './dto/transaction-input.dto';
import { TxType } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';
import { TransactionAclService } from './transaction-acl.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockedRepository: any;
  let mockedUserService: any;
  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            getById: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
        {
          provide: TransactionAclService,
          useValue: new TransactionAclService(),
        },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    service = moduleRef.get<TransactionService>(TransactionService);
    mockedRepository = moduleRef.get(TransactionRepository);
    mockedUserService = moduleRef.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const ctx = new RequestContext();
  const testUser = { id: 1, roles: [ROLE.USER], username: 'testuser' };

  describe('Create Transaction', () => {
    it('should get user from user claims user id', () => {
      ctx.user = { ...testUser };

      service.createTransaction(ctx, new CreateTransactionInput());
      expect(mockedUserService.getUserById).toHaveBeenCalledWith(ctx, 1);
    });

    it('should call repository save with proper transaction input and return proper output', () => {
      ctx.user = { ...testUser };

      const transactionInput: CreateTransactionInput = {
        name: 'Test tx',
        note: 'A Test note',
        paid: true,
        txAt: new Date('2021-09-28T15:00:00Z'),
        amount: 25,
        txType: TxType.EXPENSE,
      };
    });
  });
});
