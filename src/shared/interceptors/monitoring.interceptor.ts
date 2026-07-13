import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { MonitoringUseCase } from 'src/modules/monitoring/application/use-cases/monitoring.usecase';

@Injectable()
export class MonitoringInterceptor implements NestInterceptor {
  constructor(private readonly monitoringUseCase: MonitoringUseCase) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = (Date.now() - start) / 1000;
        this.monitoringUseCase.incrementRequestCounter(method);
        this.monitoringUseCase.recordRequestDuration(method, duration);
      }),
    );
  }
}
