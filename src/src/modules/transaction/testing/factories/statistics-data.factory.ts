import { StatisticsData } from '../../domain/repositories/transaction.repository';

export const makeStatisticsData = (): StatisticsData => ({
  count: 10,
  sum: 1234.56,
  avg: 123.45,
  min: 12.34,
  max: 456.78,
});
