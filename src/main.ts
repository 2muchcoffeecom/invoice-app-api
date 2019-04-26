import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/shared/errors/http-exception.filter';
import { ExceptionInterceptor } from './modules/shared/errors/exception.interceptor';
import { ErrorsService } from './modules/core/services/errors.service';
import { ConfigService } from './modules/core/services/config.service';


export let app: INestApplication & INestExpressApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

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
  app.enableCors();
  const port = app.get(ConfigService).get('PORT');
  await app.listen(port || 3000);
}

bootstrap();
