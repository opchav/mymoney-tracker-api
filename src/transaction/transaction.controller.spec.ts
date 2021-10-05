import { Test, TestingModule } from '@nestjs/testing';

import { AppLogger } from '../shared/logger/logger.service';
import { RequestContext } from '../shared/request-context/request-context.dto';
import { CreateTransactionInput } from './dto/transaction-input.dto';
import { TxType } from './entities/transaction.entity';
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

  const ctx = new RequestContext();

  describe('Create transaction', () => {
    let input: CreateTransactionInput;

    beforeEach(() => {
      input = {
        name: 'Test tx 1',
        note: 'Test note',
        paid: true,
        txAt: new Date(),
        amount: 15,
        txType: TxType.EXPENSE,
      };
    });

    it('should call transactionService.createTransaction with correct input', () => {
      controller.createTransaction(ctx, input);
      expect(mockedTransactionService.createTransaction).toHaveBeenCalledWith(
        ctx,
        input,
      );
    });


  });
});
