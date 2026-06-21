import { Body, Controller, Post } from '@nestjs/common';
import { DefaultResponseDto } from 'src/src/shared/dtos/default-response.dto';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
  SwaggerUnprocessableEntity,
} from 'src/src/shared/settings/swagger/swagger.decorators';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { AddTransactionDto } from './dtos/add-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly addTransactionUseCase: AddTransactionUseCase) {}

  @Post()
  @SwaggerOperation('Add a new transaction')
  @SwaggerUnprocessableEntity('Transaction rejected')
  @SwaggerInternalServerError()
  public create(@Body() dto: AddTransactionDto): DefaultResponseDto {
    this.addTransactionUseCase.execute(dto);
    return DefaultResponseDto.create('Transaction accepted and registered');
  }
}
