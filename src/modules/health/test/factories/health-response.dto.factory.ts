import { HealthResponseDto } from '../../presentation/dtos/health-response.dto';

export const makeHealthResponseDto = (
  override?: Partial<HealthResponseDto>,
): HealthResponseDto => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  ...override,
});
