import { remove } from 'fs-extra';
import { existsSync, mkdirSync } from 'graceful-fs';
import { join } from 'path';
import * as md5 from 'md5';

import { Injectable } from '@nestjs/common';

import { downloadTarball } from '../../utils';

@Injectable()
export class DownloadService {
  private readonly temp = '/tmp';

  async prepareTemp() {
    if (existsSync(this.temp)) {
    } else {
      mkdirSync(this.temp);
    }
  }
  async downloadZip(url: string) {
    await this.prepareTemp();
    const uuid = md5(`${url}-${Date.now()}`);
    const dest = join(this.temp, uuid);
    await downloadTarball(url, dest);
    return dest;
  }
  async flushTempDir(path: string) {
    await remove(path);
  }
}
