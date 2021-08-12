import { Request } from 'express';

import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Req,
} from '@nestjs/common';

import { CompilerService } from './compiler.service';

@Controller('compiler')
export class CompilerController {
  constructor(
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  @Get('imports')
  async getImports(@Req() req: Request) {
    const path = req?.query?.path;
    if (typeof path === 'string') {
      return await this.compilerService.getImports(path);
    } else {
      return new NotFoundException();
    }
  }
}
