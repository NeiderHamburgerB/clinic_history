import { NestFactory } from '@nestjs/core';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { swaggerInit } from './app.swagger';
import * as auth from 'express-basic-auth';
import { join } from 'path';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.setBaseViewsDir(join(process.cwd(), 'views'));

  const config = new ConfigService();

  app.enableCors({ origin: '*' });

  app.setViewEngine('pug');

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    '/api/docs',
    auth({
      challenge: true,
      users: { admin: config.get('PASS_SWAGGER') },
    }),
  );

  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();
