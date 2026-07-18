import { makeUseCaseMock } from 'src/shared/test/mocks/use-case.mock';
import { MonitoringUseCase } from '../application/use-cases/monitoring.usecase';
import { MonitoringController } from '../presentation/monitoring.controller';

describe('MonitoringController', () => {
  let monitoringController: MonitoringController;
  const monitoringUseCase = makeUseCaseMock();

  beforeEach(() => {
    jest.clearAllMocks();
    monitoringController = new MonitoringController(
      monitoringUseCase as unknown as MonitoringUseCase,
    );
  });

  describe('monitoring', () => {
    it('should return application metrics', () => {
      const metrics = 'metrics';
      monitoringUseCase.execute.mockReturnValue(metrics);
      const response = monitoringController.monitoring();
      expect(response).toBe(metrics);
    });
  });
});
