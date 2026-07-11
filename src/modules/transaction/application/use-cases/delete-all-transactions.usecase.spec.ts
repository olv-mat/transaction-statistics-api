import { makeTransactionRepositoryMock } from '../../testing/mocks/transaction.repository.mock';
import { DeleteAllTransactionsUseCase } from './delete-all-transactions.usecase';

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
