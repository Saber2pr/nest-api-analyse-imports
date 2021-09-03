import { existsSync, readdir, remove } from 'fs-extra';
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

  /**
   * 限制范围，只允许删除temp目录下的
   */
  canRemove(path: string) {
    return path && path.startsWith(this.temp) && existsSync(path);
  }

  /**
   * 删除temp目录
   */
  async flushTempDir(path: string): Promise<void> {
    if (this.canRemove(path)) {
      const temps = await readdir(this.temp);
      // 查找当前缓存路径
      const currentTemp = temps.find((tmpName) =>
        path.startsWith(join(this.temp, tmpName)),
      );
      const currentTempPath = join(this.temp, currentTemp);
      if (this.canRemove(currentTempPath)) {
        // 删除缓存
        await remove(currentTempPath);
      }
    }
  }
}
