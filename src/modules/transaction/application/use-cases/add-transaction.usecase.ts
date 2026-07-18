import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import {
  TransactionPayload,
  TransactionRepository,
} from '../../domain/repositories/transaction.repository';

@Injectable()
export class AddTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public execute(payload: TransactionPayload): void {
    const now = new Date();
    const { amount, timestamp } = payload;
    if (timestamp > now || amount < 0) {
      throw new UnprocessableEntityException(
        'Transaction rejected due to a rule violation',
      );
    }
    const transactionEntity = new TransactionEntity(amount, timestamp);
    this.transactionRepository.save(transactionEntity);
  }
}
