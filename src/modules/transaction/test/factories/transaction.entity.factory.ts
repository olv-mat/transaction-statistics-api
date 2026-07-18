import { TransactionEntity } from '../../domain/entities/transaction.entity';

export const makeTransactionEntity = (
  override?: Partial<TransactionEntity>,
): TransactionEntity => ({
  amount: 123.45,
  timestamp: new Date(),
  ...override,
});
