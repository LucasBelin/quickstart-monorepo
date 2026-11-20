import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument, {
    jsonDocumentUrl: 'api-json',
  });
}
