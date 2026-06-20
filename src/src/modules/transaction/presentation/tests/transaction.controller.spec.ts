import { DefaultResponseDto } from 'src/src/common/dtos/default-response.dto';
import { AddTransactionUseCase } from '../../application/use-cases/add-transaction.usecase';
import { TransactionController } from '../transaction.controller';
import { makeAddTransactionDto } from './factories/add-transaction.dto.factory';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  const addTransactionUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    transactionController = new TransactionController(
      addTransactionUseCaseMock as unknown as AddTransactionUseCase,
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
});
