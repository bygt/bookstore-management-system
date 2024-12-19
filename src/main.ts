import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger: false} );
  const config = new DocumentBuilder()
    .setTitle('Bookstore Management Api')
    .setDescription('API documentation for the Book Management System')
    .setVersion('1.0')
    .addBearerAuth() // JWT authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log("Swagger UI setup at /api-docs");
  SwaggerModule.setup('api-docs', app, document);

  console.log('Server is running on port', process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
