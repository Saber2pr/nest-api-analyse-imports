import { GetHttpUrlsDto } from './dto/GetHttpUrlsDto';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';

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

  @Get('getHttpUrls')
  async getHttpUrls(@Query() query: GetHttpUrlsDto) {
    const url = query.url;
    if (url) {
      const path = await this.downloadService.downloadZip(query.url);
      const httpUrls = await this.compilerService.getHttpUrls(path);
      await this.downloadService.flushTempDir(path);
      const result = httpUrls
        .map((item) =>
          item.matchs.map((item) => {
            delete item.matches;
            return item;
          }),
        )
        .flat()
        .filter((item) =>
          query.filter ? item.name.includes(query.filter) : true,
        );

      if (query.render === 'html') {
        if (result.length) {
          return `<ol>
          ${result
            .map((item) => {
              if (query.filter) {
                item.name = item.name.replace(
                  query.filter,
                  `<span style="color:red;">${query.filter}</span>`,
                );
              }
              return `<li>${item.name}</li>`;
            })
            .join('')}
        </ol>`;
        } else {
          return `No HTTP link detected`;
        }
      }
      return result;
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }
}
