import { GetStatisticsUseCase } from '../application/use-cases/get-statistics.usecase';
import { makeStatisticsData } from './factories/statistics-data.factory';
import { makeTransactionRepositoryMock } from './mocks/transaction.repository.mock';

describe('GetStatisticsUseCase', () => {
  let getStatisticsUseCase: GetStatisticsUseCase;
  const transactionRepositoryMock = makeTransactionRepositoryMock();

  beforeEach(() => {
    jest.clearAllMocks();
    getStatisticsUseCase = new GetStatisticsUseCase(transactionRepositoryMock);
  });

  describe('execute', () => {
    it('should return statistics data', () => {
      const statistics = makeStatisticsData();
      transactionRepositoryMock.statistics.mockReturnValue(statistics);
      const result = getStatisticsUseCase.execute();
      expect(transactionRepositoryMock.statistics).toHaveBeenCalled();
      expect(result).toBe(statistics);
    });
  });
});
