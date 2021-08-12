import { Request } from 'express';
import { CompilerService } from 'src/compiler/compiler.service';

import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { DownloadService } from '../download/download.service';
import { TarballUrlGuard } from '../tarball-url.guard';
import { GetImportsDto } from './dto';

@Controller('analyse')
export class AnalyseController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  @Post('/getImports')
  @UseGuards(TarballUrlGuard)
  async getImports(@Req() req: Request, @Body() body: GetImportsDto) {
    const url = body?.url;
    const path = await this.downloadService.downloadZip(url);
    const imports = await this.compilerService.getImports(path);
    await this.downloadService.flushTempDir(path);
    return { code: 200, data: imports };
  }
}
