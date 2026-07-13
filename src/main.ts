import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { MonitoringUseCase } from './modules/monitoring/application/use-cases/monitoring.usecase';
import { Environments } from './shared/enums/environments.enum';
import { MonitoringInterceptor } from './shared/interceptors/monitoring.interceptor';
import { swaggerSetup } from './shared/settings/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new MonitoringInterceptor(app.get(MonitoringUseCase)),
  );
  if (process.env.NODE_ENV === Environments.PRODUCTION) {
    app.use(helmet());
    app.enableCors({});
  }
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
