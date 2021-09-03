import { WinstonModule } from 'nest-winston';

import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { winstonOptions } from './config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AnalyseModule } from './modules/analyse/analyse.module';
import { CompilerModule } from './modules/compiler/compiler.module';
import { DownloadModule } from './modules/download/download.module';
import { TaskQueueController } from './modules/task-queue/task-queue.controller';
import { TaskQueueModule } from './modules/task-queue/task-queue.module';
import { TaskQueueService } from './modules/task-queue/task-queue.service';

@Module({
  imports: [
    WinstonModule.forRoot(winstonOptions),
    DownloadModule,
    AnalyseModule,
    CompilerModule,
    TaskQueueModule,
  ],
  controllers: [AppController, TaskQueueController],
  providers: [TaskQueueService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
