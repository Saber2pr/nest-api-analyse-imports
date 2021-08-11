import {
  Body,
  Controller,
  Delete,
  HttpException,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
  ) {}

  @Post('zip')
  async downloadZip(@Req() req: Request, @Body() body: { url: string }) {
    if (body.url) {
      const path = await this.downloadService.downloadZip(body.url);
      return { code: 200, data: path, message: 'download success' };
    } else {
      return new HttpException('need url', 400);
    }
  }

  @Delete()
  async flushTempFile(path: string) {
    this.downloadService.flushTempFile(path);
  }
}
