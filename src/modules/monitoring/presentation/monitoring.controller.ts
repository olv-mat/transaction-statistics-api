import { Controller, Get, Header } from '@nestjs/common';
import { MonitoringUseCase } from '../application/use-cases/monitoring.usecase';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringUseCase: MonitoringUseCase) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  public monitoring(): Promise<string> {
    return this.monitoringUseCase.execute();
  }
}
