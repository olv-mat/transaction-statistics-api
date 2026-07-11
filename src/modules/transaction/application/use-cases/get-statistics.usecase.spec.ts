import { makeStatisticsData } from '../../testing/factories/statistics-data.factory';
import { makeTransactionRepositoryMock } from '../../testing/mocks/transaction.repository.mock';
import { GetStatisticsUseCase } from './get-statistics.usecase';

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
