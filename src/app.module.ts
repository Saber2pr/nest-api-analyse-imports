import { Module } from '@nestjs/common';

import { AnalyseModule } from './analyse/analyse.module';
import { AppController } from './app.controller';
import { CompilerModule } from './compiler/compiler.module';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [DownloadModule, AnalyseModule, CompilerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
