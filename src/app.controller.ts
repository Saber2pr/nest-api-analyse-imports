import { Request } from 'express';

import { Controller, Get, HttpException, Inject, Req } from '@nestjs/common';

import { AnalyseService } from './analyse/analyse.service';
import { DownloadService } from './download/download.service';

@Controller()
export class AppController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
    @Inject(AnalyseService) private readonly analyseService: AnalyseService,
  ) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  @Get('/getImports')
  async getImports(@Req() req: Request) {
    const url = req?.query?.url;
    if (typeof url === 'string') {
      const path = await this.downloadService.downloadZip(url);
      const imports = await this.analyseService.getImpors(path);
      await this.downloadService.flushTempFile(path);
      return { code: 200, data: imports };
    } else {
      return new HttpException('need url', 400);
    }
  }
}
