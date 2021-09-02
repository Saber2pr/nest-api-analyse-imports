import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AnalyseModule } from './modules/analyse/analyse.module';
import { CompilerModule } from './modules/compiler/compiler.module';
import { DownloadModule } from './modules/download/download.module';
import { TaskQueueService } from './modules/task-queue/task-queue.service';
import { TaskQueueController } from './modules/task-queue/task-queue.controller';
import { TaskQueueModule } from './modules/task-queue/task-queue.module';

@Module({
  imports: [DownloadModule, AnalyseModule, CompilerModule, TaskQueueModule],
  controllers: [AppController, TaskQueueController],
  providers: [TaskQueueService],
})
export class AppModule {}
