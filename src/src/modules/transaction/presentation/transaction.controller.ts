import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DefaultResponseDto } from 'src/src/shared/dtos/default-response.dto';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
  SwaggerUnprocessableEntity,
} from 'src/src/shared/settings/swagger/swagger.decorators';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { GetStatisticsUseCase } from '../application/use-cases/get-statistics.usecase';
import { AddTransactionDto } from './dtos/add-transaction.dto';
import { StatisticsResponseDto } from './dtos/statistics-response.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly addTransactionUseCase: AddTransactionUseCase,
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  @Get('/statistics')
  @SwaggerOperation('Retrieve transaction statistics for the last 60 seconds')
  @SwaggerInternalServerError()
  public statistics(): StatisticsResponseDto {
    const { count, sum, avg, min, max } = this.getStatisticsUseCase.execute();
    return StatisticsResponseDto.create({
      count,
      sum,
      avg,
      min,
      max,
    });
  }

  @Post()
  @SwaggerOperation('Add a new transaction')
  @SwaggerUnprocessableEntity('Transaction rejected due to a rule violation')
  @SwaggerInternalServerError()
  public create(@Body() dto: AddTransactionDto): DefaultResponseDto {
    this.addTransactionUseCase.execute(dto);
    return DefaultResponseDto.create('Transaction accepted and registered');
  }

  @Delete()
  @SwaggerOperation('Delete all transactions')
  @SwaggerInternalServerError()
  public delete(): DefaultResponseDto {
    this.deleteAllTransactionsUseCase.execute();
    return DefaultResponseDto.create(
      'All transactions were successfully deleted',
    );
  }
}
