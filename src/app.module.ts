import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AnalyseModule } from './modules/analyse/analyse.module';
import { CompilerModule } from './modules/compiler/compiler.module';
import { DownloadModule } from './modules/download/download.module';

@Module({
  imports: [DownloadModule, AnalyseModule, CompilerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
