import * as os from 'os';
import { join } from 'path';

const tmpdir = os.tmpdir();

export const isVercel = () => {
  if (process.env.VERCEL) {
    return true;
  }
  return false;
};

export const createOutputPath = (file: string) => {
  let base = process.cwd();
  if (isVercel()) {
    base = tmpdir;
  }
  return join(base, file);
};
