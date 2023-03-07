import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerInit = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API HISTORIA CLINICA CENTRALIZADA')
    .setDescription('DOCUMENTACIÓN')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-material.css',
  });
};
