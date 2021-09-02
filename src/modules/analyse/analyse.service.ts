import { Inject, Injectable } from '@nestjs/common';

import { CompilerService } from '../compiler/compiler.service';
import { DownloadService } from '../download/download.service';

@Injectable()
export class AnalyseService {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  async getImports(url: string) {
    const path = await this.downloadService.downloadTarball(url);
    const imports = await this.compilerService.getImports(path);
    await this.downloadService.flushTempDir(path);
    return imports.map((item) => {
      delete item.file;
      return item;
    });
  }

  async getHttpUrls(url: string, filter: string, render: 'html' | 'json') {
    const path = await this.downloadService.downloadTarball(url);
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
      .filter((item) => (filter ? item.name.includes(filter) : true));

    if (render === 'html') {
      if (result.length) {
        return `<ol>
        ${result
          .map((item) => {
            if (filter) {
              item.name = item.name.replace(
                filter,
                `<span style="color:red;">${filter}</span>`,
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
  }
}
