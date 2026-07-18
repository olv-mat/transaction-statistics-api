import { UnprocessableEntityException } from '@nestjs/common';
import 'reflect-metadata';
import { AddTransactionUseCase } from '../application/use-cases/add-transaction.usecase';
import { makeAddTransactionDto } from './factories/add-transaction.dto.factory';
import { makeTransactionRepositoryMock } from './mocks/transaction.repository.mock';

describe('AddTransactionUseCase', () => {
  let addTransactionUseCase: AddTransactionUseCase;
  const transactionRepositoryMock = makeTransactionRepositoryMock();

  beforeEach(() => {
    jest.clearAllMocks();
    addTransactionUseCase = new AddTransactionUseCase(
      transactionRepositoryMock,
    );
  });

  describe('execute', () => {
    it('should add a new transaction', () => {
      const dto = makeAddTransactionDto();
      addTransactionUseCase.execute(dto);
      expect(transactionRepositoryMock.save).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: dto.amount,
          timestamp: dto.timestamp,
        }),
      );
    });

    it('should fail if timestramp is in the future', () => {
      const dto = makeAddTransactionDto({
        timestamp: new Date(Date.now() + 60000),
      });
      expect(() => addTransactionUseCase.execute(dto)).toThrow(
        UnprocessableEntityException,
      );
    });

    it('should fail if amount is negative', () => {
      const dto = makeAddTransactionDto({
        amount: -123.45,
      });
      expect(() => addTransactionUseCase.execute(dto)).toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
