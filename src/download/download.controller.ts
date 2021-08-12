import { existsSync } from 'fs';
import { Request } from 'express';

import {
  Body,
  Controller,
  Delete,
  Inject,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TarballUrlGuard } from '../tarball-url.guard';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
  ) {}

  @Post('tarball')
  @UseGuards(TarballUrlGuard)
  async downloadZip(@Req() req: Request, @Body() body: { url: string }) {
    const path = await this.downloadService.downloadZip(body.url);
    return { code: 200, data: path, message: 'download success' };
  }

  @Delete('flushTempDir')
  async flushTempDir(@Req() req: Request, @Body() body: { path: string }) {
    const path = body.path;
    if (path && existsSync(path)) {
      await this.downloadService.flushTempDir(path);
    } else {
      return new NotFoundException();
    }
  }
}
