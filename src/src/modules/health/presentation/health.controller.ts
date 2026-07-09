import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from './dtos/health-response.dto';

@Controller('health')
export class HealthController {
  @Get()
  public health(): HealthResponseDto {
    return HealthResponseDto.create({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
