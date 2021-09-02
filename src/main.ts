import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Cluster } from './cluster';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('nest-api-analyse-imports')
    .setDescription('分析服务')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('/v1/api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  const PORT = 3000;
  await app.listen(3000, () =>
    console.log(
      `server listening on port ${PORT} with the single worker ${process.pid}`,
    ),
  );
}

if (process.env.CLUSTER) {
  Cluster.register(bootstrap);
} else {
  bootstrap();
}
