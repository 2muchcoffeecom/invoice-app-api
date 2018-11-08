import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from 'express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/shared/errors/http-exception.filter';
import { ExceptionInterceptor } from './modules/shared/errors/exception.interceptor';
import { ErrorsService } from './modules/shared/services/errors.service';


export let app: INestApplication & INestExpressApplication;

async function bootstrap() {
  const server = express();
  server.use(cors());

  app = await NestFactory.create(AppModule, server);

  const options = new DocumentBuilder()
    .setTitle('Invoice App Swagger')
    .setDescription('API for Invoice App')
    .setVersion('1.0')
    .setBasePath('api')
    .setSchemes('https')
    .addTag('Customer')
    .addTag('Product')
    .addTag('Invoice')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
  app.useGlobalInterceptors(new ExceptionInterceptor(new ErrorsService()));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
