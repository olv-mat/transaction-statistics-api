import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  private readonly transactions: TransactionEntity[] = [];

  public save(transaction: TransactionEntity): void {
    this.transactions.push(transaction);
  }

  public delete(): void {
    this.transactions.length = 0;
  }
}
