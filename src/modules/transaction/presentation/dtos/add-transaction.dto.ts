import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class AddTransactionDto {
  @IsNumber()
  public readonly amount!: number;

  @IsDate()
  @Type(() => Date)
  public readonly timestamp!: Date;
}
