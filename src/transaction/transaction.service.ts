import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Action } from '../shared/acl/action.constant';
import { Actor } from '../shared/acl/actor.constant';
import { AppLogger } from '../shared/logger/logger.service';
import { RequestContext } from '../shared/request-context/request-context.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from './dto/transaction-input.dto';
import { TransactionOutput } from './dto/transaction-output.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { TransactionAclService } from './transaction-acl.service';

@Injectable()
export class TransactionService {
  constructor(
    private repository: TransactionRepository,
    private userService: UserService,
    private aclService: TransactionAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TransactionService.name);
  }

  async createTransaction(
    ctx: RequestContext,
    input: CreateTransactionInput,
  ): Promise<TransactionOutput> {
    this.logger.log(ctx, `${this.createTransaction.name} was called`);

    const tx = plainToClass(Transaction, input);

    const actor: Actor = ctx.user;

    const user = await this.userService.getUserById(ctx, actor.id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, tx);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    tx.owner = plainToClass(User, user);

    this.logger.log(ctx, `calling ${TransactionRepository.name}.save`);
    const savedTx = await this.repository.save(tx);

    return plainToClass(TransactionOutput, savedTx, {
      excludeExtraneousValues: true,
    });
  }

  async getTransactions(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ transactions: TransactionOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getTransactions.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TransactionRepository.name}.findAndCount`);
    const [articles, count] = await this.repository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    const transactionsOutput = plainToClass(TransactionOutput, articles, {
      excludeExtraneousValues: true,
    });

    return { transactions: transactionsOutput, count };
  }

  async getTransactionById(
    ctx: RequestContext,
    id: number,
  ): Promise<TransactionOutput> {
    this.logger.log(ctx, `${this.getTransactionById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${TransactionRepository.name}.getById`);
    const transaction = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, transaction);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToClass(TransactionOutput, transaction, {
      excludeExtraneousValues: true,
    });
  }
}
