import got from 'got';
import * as fs from 'graceful-fs';
import { Stream } from 'stream';
import * as tar from 'tar';
import { promisify } from 'util';

export const downloadTarball = async (
  url: string,
  extractDir: string,
  fileDownloadPath: string,
) => {
  const stream = got.stream(url) as Stream;
  await promisify(fs.mkdir)(extractDir);
  const file = fs.createWriteStream(fileDownloadPath);
  return new Promise((resolve, reject) => {
    stream
      .pipe(file)
      .on('finish', async () => {
        await tar.x({ file: fileDownloadPath, cwd: extractDir });
        resolve(extractDir);
      })
      .on('error', reject);
  });
};
