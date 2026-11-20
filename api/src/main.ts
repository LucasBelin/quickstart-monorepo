import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupSwagger } from './swagger.js';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  });
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
