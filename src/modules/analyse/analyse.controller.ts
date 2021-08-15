import { Controller, Get, HttpException, HttpStatus, Inject, Query } from '@nestjs/common';

import { CompilerService } from '../compiler/compiler.service';
import { DownloadService } from '../download/download.service';
import { ParseImportsDto } from './dto';

@Controller('analyse')
export class AnalyseController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  @Get('parseImports')
  async getImports(@Query() query: ParseImportsDto) {
    const url = query.url;
    if (url) {
      const path = await this.downloadService.downloadZip(query.url);
      const imports = await this.compilerService.getImports(path);
      await this.downloadService.flushTempDir(path);
      return imports.map((item) => {
        delete item.file;
        return item;
      });
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }
}
