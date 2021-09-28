import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../shared/logger/logger.service';
import { UserService } from '../user/services/user.service';
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
});
