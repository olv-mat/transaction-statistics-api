import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AddTransactionDto } from '../../presentation/dtos/add-transaction.dto';

@Injectable()
export class AddTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public execute(dto: AddTransactionDto): void {
    const now = new Date();
    const { amount, timestamp } = dto;
    if (timestamp > now || amount < 0) {
      throw new UnprocessableEntityException(
        'Transaction rejected due to a rule violation',
      );
    }
    const transactionEntity = new TransactionEntity(amount, timestamp);
    this.transactionRepository.save(transactionEntity);
  }
}
