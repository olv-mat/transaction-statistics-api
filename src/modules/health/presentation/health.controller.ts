import { Controller, Get } from '@nestjs/common';
import {
  SwaggerInternalServerError,
  SwaggerOperation,
} from 'src/shared/settings/swagger/swagger.decorators';
import { HealthResponseDto } from './dtos/health-response.dto';

@Controller('health')
export class HealthController {
  @Get()
  @SwaggerOperation('Check application health')
  @SwaggerInternalServerError()
  public health(): HealthResponseDto {
    return HealthResponseDto.create({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
