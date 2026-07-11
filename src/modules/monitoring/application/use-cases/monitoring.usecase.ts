import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter, Gauge, Registry } from 'prom-client';

@Injectable()
export class MonitoringUseCase {
  private readonly registry: Registry;
  private readonly counter: Counter<string>;
  private readonly gauge: Gauge<string>;

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });

    this.counter = new Counter({
      name: 'total_requests',
      help: 'Total number of requests',
      labelNames: ['method'],
    });

    this.gauge = new Gauge({
      name: 'average_request_duration',
      help: 'Average request duration in seconds',
      labelNames: ['method'],
    });

    this.registry.registerMetric(this.counter);
    this.registry.registerMetric(this.gauge);
  }

  public incrementRequestCounter(method: string): void {
    this.counter.inc({ method });
  }

  public recordRequestDuration(method: string, duration: number): void {
    this.gauge.set({ method }, duration);
  }

  public async execute(): Promise<string> {
    return this.registry.metrics();
  }
}
