import { makeStatisticsData } from '../../testing/factories/statistics-data.factory';
import { makeTransactionEntity } from '../../testing/factories/transaction.entity.factory';
import { InMemoryTransactionRepository } from './in-memory-transaction.repository';

describe('InMemoryTransactionRepository', () => {
  let inMemoryTransactionRepository: InMemoryTransactionRepository;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
  });

  afterEach(() => {
    jest.useRealTimers();
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

  describe('statistics', () => {
    it('should return empty statistics when there are no transactions', () => {
      const statistics = makeStatisticsData({
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      });
      const result = inMemoryTransactionRepository.statistics();
      expect(result).toEqual(statistics);
    });

    it('should calculate statistics for a single transaction', () => {
      inMemoryTransactionRepository.save(makeTransactionEntity());
      const statistics = makeStatisticsData({
        count: 1,
        sum: 123.45,
        avg: 123.45,
        min: 123.45,
        max: 123.45,
      });
      const result = inMemoryTransactionRepository.statistics();
      expect(result).toEqual(statistics);
    });

    it('should calculate statistics for multiple transactions', () => {
      inMemoryTransactionRepository.save(makeTransactionEntity());
      inMemoryTransactionRepository.save(
        makeTransactionEntity({ amount: 124.45 }),
      );
      inMemoryTransactionRepository.save(
        makeTransactionEntity({ amount: 122.45 }),
      );
      const statistics = makeStatisticsData({
        count: 3,
        sum: 370.35,
        avg: 123.45,
        min: 122.45,
        max: 124.45,
      });
      const result = inMemoryTransactionRepository.statistics();
      expect(result).toEqual(statistics);
    });

    it('should ignore transactions older than 60 seconds', () => {
      inMemoryTransactionRepository.save(makeTransactionEntity());
      inMemoryTransactionRepository.save(
        makeTransactionEntity({
          timestamp: new Date(Date.now() - 70000),
        }),
      );
      const statistics = makeStatisticsData({
        count: 1,
        sum: 123.45,
        avg: 123.45,
        min: 123.45,
        max: 123.45,
      });
      const result = inMemoryTransactionRepository.statistics();
      expect(result).toEqual(statistics);
    });

    it('should include transactions exactly 60 seconds old', () => {
      inMemoryTransactionRepository.save(
        makeTransactionEntity({
          timestamp: new Date(Date.now() - 60000),
        }),
      );
      const statistics = makeStatisticsData({
        count: 1,
        sum: 123.45,
        avg: 123.45,
        min: 123.45,
        max: 123.45,
      });
      const result = inMemoryTransactionRepository.statistics();
      expect(result).toEqual(statistics);
    });
  });
});
