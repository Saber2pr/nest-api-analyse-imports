import { Controller, Inject } from '@nestjs/common';

import { CompilerService } from './compiler.service';

@Controller('api/compiler')
export class CompilerController {
  constructor(
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}
}
