import 'reflect-metadata';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { makeUseCaseMock } from '../../../shared/test/mocks/use-case.mock';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { GetStatisticsUseCase } from '../application/use-cases/get-statistics.usecase';
import { StatisticsResponseDto } from '../presentation/dtos/statistics-response.dto';
import { TransactionController } from '../presentation/transaction.controller';
import { makeAddTransactionDto } from '../test/factories/add-transaction.dto.factory';
import { makeStatisticsData } from '../test/factories/statistics-data.factory';

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

  describe('add', () => {
    it('should return a default response', () => {
      const dto = makeAddTransactionDto();
      const response = transactionController.add(dto);
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
