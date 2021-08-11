import { existsSync, mkdirSync, unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { downloadTarball } from '@tuyaworks/core';

@Injectable()
export class DownloadService {
  private readonly temp = join(__dirname, '__temp__');

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
  async flushTempFile(path: string) {
    if (existsSync(path)) {
      await promisify(unlink)(path);
    }
  }
}
