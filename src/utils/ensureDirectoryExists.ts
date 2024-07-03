import { promises as fs } from 'fs';

export async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  try {
    await fs.mkdir(directoryPath, { recursive: true });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== 'EEXIST') {
      throw new Error(`Failed to create directory ${directoryPath}: ${err.message}`);
    }
  }
}
