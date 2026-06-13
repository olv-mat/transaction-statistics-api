import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export function swaggerSetup(app: INestApplication): void {
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
}
