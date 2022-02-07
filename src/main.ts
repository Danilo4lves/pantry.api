import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';

import { AppModule } from './app.module';

function applySecurityUtilities(app: INestApplication) {
  app.use(helmet());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applySecurityUtilities(app);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}

bootstrap();
