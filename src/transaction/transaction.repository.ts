import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async getById(id: number): Promise<Transaction> {
    const transaction = await this.findOne(id);
    if (!transaction) {
      throw new NotFoundException();
    }

    return transaction;
  }
}
