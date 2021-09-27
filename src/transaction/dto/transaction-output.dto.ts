import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TxType } from '../entities/transaction.entity';
import {OwnerOutput} from './owner-output.dto';

export class TransactionOutput {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  note: string;

  @Expose()
  @ApiProperty()
  txAt: Date;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  paid: boolean;

  @Expose()
  @ApiProperty()
  amount: number;

  @Expose()
  @ApiProperty()
  txType: TxType;

  @Expose()
  @Type(() => OwnerOutput)
  @ApiProperty()
  author: OwnerOutput;
}
