import got from 'got';
import { remote } from 'unpack-stream';

export const downloadTarball = async (url: string, dest: string) => {
  const stream = got.stream(url);
  await remote(stream as any, dest);
};
