import * as dotenv from 'dotenv';
import * as path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

import { FetchOptions } from '@interfaces/fetchOptions.interface';
import { ensureDirectoryExists } from '@utils/ensureDirectoryExists';
import { fetchInput } from './fetchInput';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath });

const AOC_COOKIE = process.env.AOC_COOKIE;

export async function getInput(yearDay: string, destination: string): Promise<void> {
  const [year, day, part] = yearDay.split('-').map(Number);
  const inputPath = path.join(destination, 'input.md');

  const options: FetchOptions = {
    headers: {
      'cookie': `session=${AOC_COOKIE}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  console.log(`Fetching input for puzzle day ${day} in ${year} version of Advent of Code...`);

  try {
    await ensureDirectoryExists(destination);
    const input = await fetchInput(year, day, options);
    await fs.writeFile(inputPath, input);
    console.log(`Input retrieved and saved to ${inputPath}`);
  } catch (error) {
    console.error('Error fetching or saving puzzle input : ', error);
  }
}
