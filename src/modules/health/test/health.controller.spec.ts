import { HealthController } from '../presentation/health.controller';
import { makeHealthResponseDto } from './factories/health-response.dto.factory';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    healthController = new HealthController();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('health', () => {
    it('should return a health response', () => {
      const response = healthController.health();
      expect(response).toEqual(makeHealthResponseDto());
    });
  });
});
