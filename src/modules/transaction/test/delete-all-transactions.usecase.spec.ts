import { DeleteAllTransactionsUseCase } from '../application/use-cases/delete-all-transactions.usecase';
import { makeTransactionRepositoryMock } from './mocks/transaction.repository.mock';

describe('DeleteAllTransactionsUseCase', () => {
  let deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase;
  const transactionRepositoryMock = makeTransactionRepositoryMock();

  beforeEach(() => {
    jest.clearAllMocks();
    deleteAllTransactionsUseCase = new DeleteAllTransactionsUseCase(
      transactionRepositoryMock,
    );
  });

  describe('execute', () => {
    it('should delete all transactions', () => {
      deleteAllTransactionsUseCase.execute();
      expect(transactionRepositoryMock.delete).toHaveBeenCalled();
    });
  });
});
