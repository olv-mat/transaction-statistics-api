import { Module } from '@nestjs/common';
import { AddTransactionUseCase } from './application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from './application/use-cases/delete-all-transactions.usecase';
import { GetStatisticsUseCase } from './application/use-cases/get-statistics.usecase';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { InMemoryTransactionRepository } from './infrastructure/in-memory/in-memory-transaction.repository';
import { TransactionController } from './presentation/transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [
    AddTransactionUseCase,
    DeleteAllTransactionsUseCase,
    GetStatisticsUseCase,
    {
      provide: TransactionRepository,
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class TransactionModule {}
