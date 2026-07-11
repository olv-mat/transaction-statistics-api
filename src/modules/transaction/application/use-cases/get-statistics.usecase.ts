import { Injectable } from '@nestjs/common';
import {
  StatisticsData,
  TransactionRepository,
} from '../../domain/repositories/transaction.repository';

@Injectable()
export class GetStatisticsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public execute(): StatisticsData {
    return this.transactionRepository.statistics();
  }
}
