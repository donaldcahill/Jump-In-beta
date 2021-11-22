import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  console.log(__dirname + `/cert/www_jih-service_com_key.pem`);
  const httpsOptions = {
    key: fs.readFileSync(__dirname + `/cert/www_jih-service_com.key`),
    cert: fs.readFileSync(__dirname + `/cert/www_jih-service_com.crt`),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  //const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Jump in Help')
    .setDescription('Docs for Jump in help')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4050);
}
bootstrap();
