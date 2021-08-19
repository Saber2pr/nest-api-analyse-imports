import { remove } from 'fs-extra';
import { mkdir } from 'graceful-fs';
import * as md5 from 'md5';
import { join } from 'path';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';

import { downloadTarball } from '../../utils';

@Injectable()
export class DownloadService {
  private readonly temp = '/tmp';

  async prepareTemp() {
    try {
      await promisify(mkdir)(this.temp);
    } catch (error) {}
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
