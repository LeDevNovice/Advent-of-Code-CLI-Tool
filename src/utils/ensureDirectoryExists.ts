import * as fs from 'fs';
import { promisify } from 'util';

const mkdirAsync = promisify(fs.mkdir);

export async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  try {
    await mkdirAsync(directoryPath, { recursive: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}
