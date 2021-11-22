import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(__dirname + `/cert/www_jih-service_com.key`),
    cert: fs.readFileSync(__dirname + `/cert/www_jih-service_com.crt`),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  //const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Quiz example')
    .setDescription('The quiz API description')
    .setVersion('1.0')
    .addTag('Quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(7000);
}
bootstrap();
