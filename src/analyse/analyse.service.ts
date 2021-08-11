import { Injectable } from '@nestjs/common';
import tp from '@saber2pr/ts-compiler';

@Injectable()
export class AnalyseService {
  async getImpors(path: string) {
    const imports = await tp.getImports(path);
    return imports;
  }
}
