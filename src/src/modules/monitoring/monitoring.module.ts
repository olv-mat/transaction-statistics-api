import { Module } from '@nestjs/common';
import { MonitoringUseCase } from './application/use-cases/monitoring.usecase';
import { MonitoringController } from './presentation/monitoring.controller';

@Module({
  controllers: [MonitoringController],
  providers: [MonitoringUseCase],
})
export class MonitoringModule {}
