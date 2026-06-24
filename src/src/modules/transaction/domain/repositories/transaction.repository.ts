import { TransactionEntity } from '../../domain/entities/transaction.entity';

export abstract class TransactionRepository {
  public abstract save(transaction: TransactionEntity): void;
  public abstract delete(): void;
}
