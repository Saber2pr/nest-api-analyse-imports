import { CompilerService } from 'src/compiler/compiler.service';

import { Module } from '@nestjs/common';

import { DownloadService } from '../download/download.service';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';

@Module({
  providers: [AnalyseService, CompilerService, DownloadService],
  controllers: [AnalyseController],
})
export class AnalyseModule {}
