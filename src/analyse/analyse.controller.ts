import { Request } from 'express';

import { Controller, Get, HttpException, Inject, Req } from '@nestjs/common';

import { AnalyseService } from './analyse.service';

@Controller('analyse')
export class AnalyseController {
  constructor(
    @Inject(AnalyseService) private readonly analyseService: AnalyseService,
  ) {}

  @Get('imports')
  async getImports(@Req() req: Request) {
    const path = req?.query?.path;
    if (typeof path === 'string') {
      return await this.analyseService.getImpors(path);
    } else {
      return new HttpException('need path', 400);
    }
  }
}
