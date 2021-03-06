import { GetJsonSchemaTypeDto } from './dto/GetJsonSchemaTypeDto';
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
import { GetHttpUrlsBatchDto } from './dto/GetHttpUrlsBatchDto';
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
      return this.analyseService.getHttpUrls(url, query.filter, query.render);
    } else {
      return new HttpException('need url', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    description: '批量解析tarball中http链接',
  })
  @Post('getHttpUrlsBatch')
  @UseGuards(GetHttpUrlFilterGuard)
  async getHttpUrlsBatch(@Body() body: GetHttpUrlsBatchDto) {
    const urls = body.urls;
    if (Array.isArray(urls)) {
      return await this.taskQueueService.run(urls, (url) =>
        this.analyseService.getHttpUrls(url, body.filter, 'json'),
      );
    } else {
      return new HttpException('urls must be array', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('json/schema/tstype')
  async getJsonSchemaType(@Body() body: GetJsonSchemaTypeDto) {
    return this.analyseService.getJsonSchemaType(body);
  }
}
