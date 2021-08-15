import { Injectable } from '@nestjs/common';
import * as tp from '@saber2pr/ts-compiler';

@Injectable()
export class CompilerService {
  async getImports(path: string) {
    const imports = await tp.getImports(path);
    return imports;
  }
}
