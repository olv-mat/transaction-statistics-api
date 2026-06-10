import { AddTransactionDto } from '../../dtos/add-transaction.dto';

type AddTransactionDtoOverride = Partial<
  Record<keyof AddTransactionDto, unknown>
>;

export const makeAddTransactionDto = (
  override?: AddTransactionDtoOverride,
): AddTransactionDto => {
  return Object.assign(new AddTransactionDto(), {
    amount: 123.45,
    timestamp: new Date(),
    ...override,
  });
};
