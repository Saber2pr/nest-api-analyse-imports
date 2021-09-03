import { remove } from 'fs-extra';
import { mkdir } from 'graceful-fs';
import { nanoid } from 'nanoid';
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
  createTarPath(dest: string) {
    return `${dest}.tar.gz`;
  }
  async downloadTarball(url: string) {
    await this.prepareTemp();
    const uuid = nanoid();
    const dest = join(this.temp, uuid);
    await downloadTarball(url, dest, this.createTarPath(dest));
    return dest;
  }
  async flushTempDir(path: string) {
    await remove(path);
    await remove(this.createTarPath(path));
  }
}
