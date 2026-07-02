import 'reflect-metadata';
import { DefaultResponseDto } from 'src/src/shared/dtos/default-response.dto';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { GetStatisticsUseCase } from '../application/use-cases/get-statistics.usecase';
import { makeAddTransactionDto } from '../testing/factories/add-transaction.dto.factory';
import { makeStatisticsData } from '../testing/factories/statistics-data.factory';
import { makeUseCaseMock } from '../testing/mocks/use-case.mock';
import { StatisticsResponseDto } from './dtos/statistics-response.dto';
import { TransactionController } from './transaction.controller';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  const addTransactionUseCaseMock = makeUseCaseMock();
  const deleteAllTransactionUseCaseMock = makeUseCaseMock();
  const getStatisticsUseCaseMock = makeUseCaseMock();

  beforeEach(() => {
    jest.clearAllMocks();
    transactionController = new TransactionController(
      addTransactionUseCaseMock as unknown as AddTransactionUseCase,
      deleteAllTransactionUseCaseMock as unknown as DeleteAllTransactionsUseCase,
      getStatisticsUseCaseMock as unknown as GetStatisticsUseCase,
    );
  });

  describe('create', () => {
    it('should return a default response', () => {
      const dto = makeAddTransactionDto();
      const response = transactionController.create(dto);
      expect(addTransactionUseCaseMock.execute).toHaveBeenCalledWith(dto);
      expect(response instanceof DefaultResponseDto).toBe(true);
    });
  });

  describe('delete', () => {
    it('should return a default response', () => {
      const response = transactionController.delete();
      expect(deleteAllTransactionUseCaseMock.execute).toHaveBeenCalled();
      expect(response instanceof DefaultResponseDto).toBe(true);
    });
  });

  describe('statistics', () => {
    it('should return a statistics response', () => {
      getStatisticsUseCaseMock.execute.mockReturnValue(makeStatisticsData());
      const response = transactionController.statistics();
      expect(getStatisticsUseCaseMock.execute).toHaveBeenCalled();
      expect(response instanceof StatisticsResponseDto).toBe(true);
    });
  });
});
