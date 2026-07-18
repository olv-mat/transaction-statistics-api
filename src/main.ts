import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { MonitoringUseCase } from './modules/monitoring/application/use-cases/monitoring.usecase';
import { Environments } from './shared/enums/environments.enum';
import { MonitoringInterceptor } from './shared/infrastructure/interceptors/monitoring.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Transaction Statistics API')
      .setDescription(
        'A NestJS-based API that processes transactions and provides real-time statistics, built with a strong focus on Clean Architecture principles.',
      )
      .build(),
  );
  const theme = new SwaggerTheme();
  SwaggerModule.setup('/api', app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
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
