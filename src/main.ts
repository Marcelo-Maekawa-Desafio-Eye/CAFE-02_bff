import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  setupSwagger(app);

  await app.listen(3000);
  console.log('Application: http://localhost:3000');
  console.log('Swagger: http://localhost:3000/api/docs');
}
bootstrap();