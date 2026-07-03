import { makeTransactionEntity } from '../../testing/factories/transaction.entity.factory';
import { InMemoryTransactionRepository } from './in-memory-transaction.repository';

describe('InMemoryTransactionRepository', () => {
  let inMemoryTransactionRepository: InMemoryTransactionRepository;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
  });

  describe('save', () => {
    it('should store the transaction', () => {
      const transactionEntity = makeTransactionEntity();
      inMemoryTransactionRepository.save(transactionEntity);
      const items = inMemoryTransactionRepository.items();
      expect(items).toHaveLength(1);
      expect(items[0]).toBe(transactionEntity);
    });
  });

  describe('delete', () => {
    it('should clear all stored transactions', () => {
      inMemoryTransactionRepository.save(makeTransactionEntity());
      inMemoryTransactionRepository.save(makeTransactionEntity());
      inMemoryTransactionRepository.delete();
      const items = inMemoryTransactionRepository.items();
      expect(items).toHaveLength(0);
    });
  });
});
