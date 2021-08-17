import { checkPattern } from './../../utils/checkPattern';
import { Injectable } from '@nestjs/common';
import * as tp from '@saber2pr/ts-compiler';

@Injectable()
export class CompilerService {
  async getImports(path: string) {
    const imports = await tp.getImports(path);
    return imports;
  }
  async getHttpUrls(path: string) {
    return checkPattern(
      path,
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        .source,
    );
  }
}
