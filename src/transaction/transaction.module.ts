import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';

import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';
import {TransactionAclService} from './transaction-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([TransactionRepository]),
    UserModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionAclService],
  exports: [TransactionService],
})
export class TransactionModule {}
