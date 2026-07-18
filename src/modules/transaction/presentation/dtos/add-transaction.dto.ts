import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { TransactionPayload } from '../../domain/repositories/transaction.repository';

export class AddTransactionDto implements TransactionPayload {
  @IsNumber()
  public readonly amount!: number;

  @IsDate()
  @Type(() => Date)
  public readonly timestamp!: Date;
}
