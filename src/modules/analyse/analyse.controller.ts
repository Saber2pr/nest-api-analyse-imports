import { GetHttpUrlFilterGuard } from 'src/guards/get-http-url-filter.guard';

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { TaskQueueService } from '../task-queue/task-queue.service';
import { AnalyseService } from './analyse.service';
import { ParseImportsDto } from './dto';
import { GetHttpUrlsDto } from './dto/GetHttpUrlsDto';

@Controller('analyse')
export class AnalyseController {
  constructor(
    private readonly analyseService: AnalyseService,
    private readonly taskQueueService: TaskQueueService,
  ) {}

  @ApiOperation({
    description: '解析tarball代码中import语句',
  })
  @Get('parseImports')
  async getImports(@Query() query: ParseImportsDto) {
    const url = query.url;
    if (url) {
      return this.analyseService.getImports(url);
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    description: '解析tarball中http链接',
  })
  @Get('getHttpUrls')
  @UseGuards(GetHttpUrlFilterGuard)
  async getHttpUrls(@Query() query: GetHttpUrlsDto) {
    const url = query.url;
    if (url) {
      return await this.taskQueueService.run(url.split(','), (url) =>
        this.analyseService.getHttpUrls(url, query.filter, query.render),
      );
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    description: '解析tarball中http链接',
  })
  @Post('getHttpUrls')
  @UseGuards(GetHttpUrlFilterGuard)
  async getHttpUrlsBatch(@Body() body: GetHttpUrlsDto) {
    const url = body.url;
    if (url) {
      return await this.taskQueueService.run(url.split(','), (url) =>
        this.analyseService.getHttpUrls(url, body.filter, body.render),
      );
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }
}
