import { Request } from 'express';
import { CompilerService } from 'src/compiler/compiler.service';

import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Req,
} from '@nestjs/common';

import { DownloadService } from '../download/download.service';

@Controller('analyse')
export class AnalyseController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  @Post('/getImports')
  async getImports(@Req() req: Request, @Body() body: { url: string }) {
    const url = body?.url;
    if (typeof url === 'string') {
      const path = await this.downloadService.downloadZip(url);
      const imports = await this.compilerService.getImports(path);
      await this.downloadService.flushTempFile(path);
      return { code: 200, data: imports };
    } else {
      return new HttpException('need url', 400);
    }
  }
}
