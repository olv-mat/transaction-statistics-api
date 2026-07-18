import { MonitoringUseCase } from '../application/use-cases/monitoring.usecase';

describe('MonitoringUseCase', () => {
  let monitoringUseCase: MonitoringUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    monitoringUseCase = new MonitoringUseCase();
  });

  describe('incRequestCounter', () => {
    it('should increment request counter', async () => {
      const metric = 'total_requests{method="GET"} 1';
      monitoringUseCase.incRequestCounter('GET');
      const response = await monitoringUseCase.execute();
      expect(response).toContain(metric);
    });
  });

  describe('setRequestDuration', () => {
    it('should record request duration', async () => {
      const metric = 'average_request_duration{method="POST"} 0.36';
      monitoringUseCase.setRequestDuration('POST', 0.36);
      const response = await monitoringUseCase.execute();
      expect(response).toContain(metric);
    });
  });

  describe('execute', () => {
    it('should return metrics', async () => {
      const response = await monitoringUseCase.execute();
      expect(response).toContain('total_requests');
      expect(response).toContain('average_request_duration');
    });
  });
});
