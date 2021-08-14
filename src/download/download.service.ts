import { remove } from 'fs-extra';
import { existsSync, mkdirSync } from 'graceful-fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { downloadTarball } from '@tuyaworks/core';

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
    const uuid = `${Date.now()}`;
    const dest = join(this.temp, uuid);
    await downloadTarball(url, dest);
    return dest;
  }
  async flushTempDir(path: string) {
    await remove(path);
  }
}
