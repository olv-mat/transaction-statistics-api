import { TransactionEntity } from '../entities/transaction.entity';

export type StatisticsData = {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
};

export type TransactionPayload = {
  amount: number;
  timestamp: Date;
};

export abstract class TransactionRepository {
  public abstract save(transaction: TransactionEntity): void;
  public abstract delete(): void;
  public abstract statistics(): StatisticsData;
}
