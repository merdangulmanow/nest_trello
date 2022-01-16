import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
      whitelist : true,
      forbidNonWhitelisted : true,
    })
  )

  const config = new DocumentBuilder().setTitle('Test task for Nest.js').setDescription('Documentation of Rest API')
                  .setVersion('1.0.0').addTag('Merdan').build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)


  await app.listen(PORT, ()=> {console.log(`server started on ${PORT}`);
  });
}
bootstrap();
