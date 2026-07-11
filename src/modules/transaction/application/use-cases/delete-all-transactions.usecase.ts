import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public execute(): void {
    this.transactionRepository.delete();
  }
}
