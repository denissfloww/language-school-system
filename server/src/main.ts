import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';

const env = process.env.NODE_ENV;
const p = path.join(process.cwd(), `.${env}.env`);
const dotEnvOptions = {
  path: p,
};

dotenv.config(dotEnvOptions);

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: true,
  });
  app.use(json({ limit: '900mb' }));
  app.use(urlencoded({ extended: true, limit: '900mb' }));
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started. Port: ${PORT}`);
  });
}

bootstrap();
