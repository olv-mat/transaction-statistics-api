import { Controller, Get, Header } from '@nestjs/common';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
} from 'src/shared/presentation/swagger/swagger.decorators';
import { MonitoringUseCase } from '../application/use-cases/monitoring.usecase';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringUseCase: MonitoringUseCase) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  @SwaggerOperation('Retrieve application monitoring metrics')
  @SwaggerInternalServerError()
  public monitoring(): Promise<string> {
    return this.monitoringUseCase.execute();
  }
}
