import { Module } from '@nestjs/common';

import { AnalyseModule } from './analyse/analyse.module';
import { AppController } from './app.controller';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [AnalyseModule, DownloadModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
