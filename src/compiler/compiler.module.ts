import { Module } from '@nestjs/common';

import { CompilerController } from './compiler.controller';
import { CompilerService } from './compiler.service';

@Module({
  providers: [CompilerService],
  controllers: [CompilerController],
})
export class CompilerModule {}
