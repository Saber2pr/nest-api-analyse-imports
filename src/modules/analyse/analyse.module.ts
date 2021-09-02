import { Module } from '@nestjs/common';

import { CompilerService } from '../compiler/compiler.service';
import { DownloadService } from '../download/download.service';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';

@Module({
  providers: [
    AnalyseService,
    CompilerService,
    DownloadService,
    TaskQueueService,
  ],
  controllers: [AnalyseController],
})
export class AnalyseModule {}
