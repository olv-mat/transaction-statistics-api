import { Module } from '@nestjs/common';
import { AddTransactionUseCase } from './application/use-cases/add-transaction.usecase';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { InMemoryTransactionRepository } from './infrastructure/in-memory/in-memory-transaction.repository';
import { TransactionController } from './presentation/transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [
    AddTransactionUseCase,
    {
      provide: TransactionRepository,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class TransactionModule {}
