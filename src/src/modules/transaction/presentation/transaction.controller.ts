import { Body, Controller, Post } from '@nestjs/common';
import { DefaultResponseDto } from 'src/src/common/dtos/default-response.dto';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { AddTransactionDto } from './dtos/add-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly addTransactionUseCase: AddTransactionUseCase) {}

  @Post()
  public create(@Body() dto: AddTransactionDto): DefaultResponseDto {
    this.addTransactionUseCase.execute(dto);
    return DefaultResponseDto.create('Transaction accepted and registered');
  }
}
