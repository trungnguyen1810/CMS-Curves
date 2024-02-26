import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './middleware/logger.middleware';
import {auth} from './middleware/auth.admin.middleware';
import {HttpExceptionFilter} from './middleware/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API mobile')
    .setDescription('Mô tả các api mobile')
    .setVersion('1.0')
    .addTag('apidescription')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidescription', app, document);
  app.use(logger);
  app.enableCors();
  app.use(auth);  
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
  })

  await app.listen(3000);
}
bootstrap();
