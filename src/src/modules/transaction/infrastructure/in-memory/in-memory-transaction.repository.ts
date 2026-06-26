import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import {
  StatisticsData,
  TransactionRepository,
} from '../../domain/repositories/transaction.repository';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  private readonly transactions: TransactionEntity[] = [];

  public save(transaction: TransactionEntity): void {
    this.transactions.push(transaction);
  }

  public delete(): void {
    this.transactions.length = 0;
  }

  public statistics(): StatisticsData {
    const now = Date.now();
    const statistics: StatisticsData = {
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    };

    for (const transaction of this.transactions) {
      const timestamp = transaction.timestamp;
      const timestampMilliseconds = timestamp.getTime();

      if (timestampMilliseconds < now - 60000) {
        continue;
      }

      const amount = transaction.amount;

      statistics.count++;
      statistics.sum += amount;

      if (statistics.count === 1) {
        statistics.min = amount;
        statistics.max = amount;
      } else {
        statistics.min = Math.min(statistics.min, amount);
        statistics.max = Math.max(statistics.max, amount);
      }
    }

    if (statistics.count > 0) {
      statistics.avg = statistics.sum / statistics.count;
    }

    return statistics;
  }
}
