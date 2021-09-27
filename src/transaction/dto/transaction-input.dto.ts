import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { TxType } from '../entities/transaction.entity';

// const today = (): Date => {
//   const dayStart = new Date()
//     .toISOString()
//     .substring(0, 11)
//     .concat('00:00:00Z');

//   return new Date(dayStart);
// };

export class CreateTransactionInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  // TODO handle default value when not in the payload
  @ApiProperty()
  @IsOptional()
  @IsString()
  note = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;

  // TODO fix min date validation
  // @MinDate(today())
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  txAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TxType)
  txType: TxType;
}

export class UpdateTransactionInput {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;

  // TODO fix min date validation
  // @MinDate(today())
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  txAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TxType)
  txType: TxType;
}
