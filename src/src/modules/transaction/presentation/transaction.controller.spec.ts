import 'reflect-metadata';
import { DefaultResponseDto } from 'src/src/shared/dtos/default-response.dto';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { makeAddTransactionDto } from '../testing/factories/add-transaction.dto.factory';
import { TransactionController } from './transaction.controller';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  const addTransactionUseCaseMock = {
    execute: jest.fn(),
  };
  const deleteAllTransactionUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    transactionController = new TransactionController(
      addTransactionUseCaseMock as unknown as AddTransactionUseCase,
      deleteAllTransactionUseCaseMock as unknown as DeleteAllTransactionsUseCase,
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
});
