export const makeTransactionRepositoryMock = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  statistics: jest.fn(),
});
