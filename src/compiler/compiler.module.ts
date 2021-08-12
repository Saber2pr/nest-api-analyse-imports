import { CompilerService } from './compiler.service';
import { Module } from '@nestjs/common';
import { CompilerController } from './compiler.controller';

@Module({
  providers: [CompilerService],
  controllers: [CompilerController],
})
export class CompilerModule {}
