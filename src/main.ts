import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/shared/errors/http-exception.filter';
import { ConfigService } from './modules/core/services/config.service';
import { ParseErrorInterceptor } from './modules/shared/errors/parse-error.interceptor';


export let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

  /**
   * Swagger Setup
   */
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
  // app.useGlobalInterceptors(new ExceptionInterceptor(new ErrorsService()));
  /**
   * Used for handling error and transforming them to parsed error
   * Used mostly for resolvers
   */
  app.useGlobalInterceptors(new ParseErrorInterceptor());

  /**
   * Used for HttpExeptions that are thrown by Rest API controllers
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');
  app.enableCors();
  const port = app.get(ConfigService).get('PORT');
  await app.listen(port || 3000);
}

bootstrap();
