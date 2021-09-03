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
  async downloadTarball(url: string) {
    await this.prepareTemp();
    const uuid = nanoid();
    const dest = join(this.temp, uuid);
    await downloadTarball(url, dest);
    return dest;
  }
  async flushTempDir(path: string) {
    if (path && path.startsWith(this.temp)) {
      await remove(path);
    }
  }
}
