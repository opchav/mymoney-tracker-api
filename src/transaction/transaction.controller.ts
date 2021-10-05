import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '../shared/dtos/base-api-response.dto';
import { PaginationParamsDto } from '../shared/dtos/pagination-params.dto';
import { AppLogger } from '../shared/logger/logger.service';
import { ReqContext } from '../shared/request-context/req-context.decorator';
import { RequestContext } from '../shared/request-context/request-context.dto';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from './dto/transaction-input.dto';
import { TransactionOutput } from './dto/transaction-output.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly txService: TransactionService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TransactionController.name);
  }

  @Post()
  @ApiOperation({
    summary: 'Create transaction API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(TransactionOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createTransaction(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreateTransactionInput,
  ): Promise<BaseApiResponse<TransactionOutput>> {
    const transaction = await this.txService.createTransaction(ctx, input);
    return { data: transaction, meta: {} };
  }

  @Get()
  @ApiOperation({
    summary: 'Get transactions as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([TransactionOutput]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTransactions(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<TransactionOutput[]>> {
    this.logger.log(ctx, `${this.getTransactions.name} was called`);

    const { transactions, count } = await this.txService.getTransactions(
      ctx,
      query.limit,
      query.offset,
    );

    return { data: transactions, meta: { count } };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get transaction by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TransactionOutput),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getTransaction(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<TransactionOutput>> {
    this.logger.log(ctx, `${this.getTransaction.name} was called`);

    const transaction = await this.txService.getTransactionById(ctx, id);
    return { data: transaction, meta: {} };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update transaction API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TransactionOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @ReqContext() ctx: RequestContext,
    @Param('id') transactionId: number,
    @Body() input: UpdateTransactionInput,
  ): Promise<BaseApiResponse<TransactionOutput>> {
    const transaction = await this.txService.updateTransaction(
      ctx,
      transactionId,
      input,
    );
    return { data: transaction, meta: {} };
  }
}
