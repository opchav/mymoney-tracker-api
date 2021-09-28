import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../shared/logger/logger.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;
  const mockedTransactionService = {
    getTransactions: jest.fn(),
    getTransactionById: jest.fn(),
    createTransaction: jest.fn(),
  };
  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        { provide: TransactionService, useValue: mockedTransactionService },
        { provide: AppLogger, useValue: mockedLogger },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
