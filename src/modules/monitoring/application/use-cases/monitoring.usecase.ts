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
      registers: [this.registry],
    });

    this.gauge = new Gauge({
      name: 'average_request_duration',
      help: 'Average request duration in seconds',
      labelNames: ['method'],
      registers: [this.registry],
    });
  }

  public incRequestCounter(method: string): void {
    this.counter.inc({ method });
  }

  public setRequestDuration(method: string, duration: number): void {
    this.gauge.set({ method }, duration);
  }

  public execute(): Promise<string> {
    return this.registry.metrics();
  }
}
