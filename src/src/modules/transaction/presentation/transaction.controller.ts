import { Body, Controller, Delete, Post } from '@nestjs/common';
import { DefaultResponseDto } from 'src/src/shared/dtos/default-response.dto';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
  SwaggerUnprocessableEntity,
} from 'src/src/shared/settings/swagger/swagger.decorators';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { AddTransactionDto } from './dtos/add-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly addTransactionUseCase: AddTransactionUseCase,
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
  ) {}

  @Post()
  @SwaggerOperation('Add a new transaction')
  @SwaggerUnprocessableEntity('Transaction rejected')
  @SwaggerInternalServerError()
  public create(@Body() dto: AddTransactionDto): DefaultResponseDto {
    this.addTransactionUseCase.execute(dto);
    return DefaultResponseDto.create('Transaction accepted and registered');
  }

  @Delete()
  public delete(): DefaultResponseDto {
    this.deleteAllTransactionsUseCase.execute();
    return DefaultResponseDto.create(
      'All transactions were successfully deleted',
    );
  }
}
