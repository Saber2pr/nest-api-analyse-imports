import { AnalyseService } from './analyse.service';
import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';

@Module({
  providers: [AnalyseService],
  controllers: [AnalyseController],
})
export class AnalyseModule {}
