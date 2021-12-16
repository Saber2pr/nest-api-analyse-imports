import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createApiDocs } from '@saber2pr/nest-swagger-md';

import { AppModule } from './app.module';
import { Cluster } from './cluster';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { createOutputPath } from './utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('nest-api-analyse-imports')
    .setDescription('分析服务')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  await createApiDocs(document, createOutputPath('./api'), {
    prefix: '/v1/api',
  });
  SwaggerModule.setup('api', app, document);

  // log
  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);

  const prefix = '/v1/api';
  app.setGlobalPrefix(prefix);
  app.useGlobalInterceptors(new ResponseInterceptor(winstonLogger));

  app.enableCors({
    origin: '*',
  });

  const PORT = 3000;
  await app.listen(PORT, () =>
    console.log(
      `server listening on port http://localhost:${PORT}${prefix} with the single worker ${process.pid}`,
    ),
  );
}

if (process.env.CLUSTER) {
  Cluster.register(bootstrap);
} else {
  bootstrap();
}
